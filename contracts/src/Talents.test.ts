import { ORACLE_PUBLIC_KEY, Talents } from './Talents';
import {
  Field,
  Mina,
  PrivateKey,
  PublicKey,
  AccountUpdate,
  Signature,
  Account,
} from 'snarkyjs';

let proofsEnabled = false;

let testOraclePrivateKey =
  'EKF8bBx79KRDU82y3TQtWadsAzd872u8pFEmv2LVqTQNDuW8vu9v';

function createLocalBlockchain() {
  const Local = Mina.LocalBlockchain({ proofsEnabled });
  Mina.setActiveInstance(Local);
  return Local.testAccounts[0];
}

async function localDeploy(
  zkAppInstance: Talents,
  zkAppAccount: PrivateKey,
  deployerAccount: PrivateKey,
  deployerPubkey: PublicKey
) {
  const txn = await Mina.transaction(deployerPubkey, () => {
    AccountUpdate.fundNewAccount(deployerPubkey);
    zkAppInstance.deploy();
    zkAppInstance.init();
  });

  await txn.prove();
  txn.sign([deployerAccount, zkAppAccount]).send();
}

describe('Talents.js', () => {
  let deployerAccount: PrivateKey,
    deployerPubkey: PublicKey,
    zkAppAccount: PrivateKey,
    zkAppPubKey: PublicKey;

  beforeAll(async () => {
    if (proofsEnabled) Talents.compile();
  });

  beforeEach(async () => {
    const newAccount = createLocalBlockchain();
    deployerAccount = newAccount.privateKey;
    deployerPubkey = newAccount.publicKey;
    zkAppAccount = PrivateKey.random();
    zkAppPubKey = zkAppAccount.toPublicKey();
  });

  describe('Talents()', () => {
    it('should deploys talent contract', async () => {
      const zkTalentInstance = new Talents(zkAppPubKey);
      await localDeploy(
        zkTalentInstance,
        zkAppAccount,
        deployerAccount,
        deployerPubkey
      );
      const oraclePublicKey = zkTalentInstance.oraclePublicKey.get();
      expect(oraclePublicKey).toEqual(PublicKey.fromBase58(ORACLE_PUBLIC_KEY));
    });
    it('should initialize talent contract properly', async () => {
      const zkTalentInstance = new Talents(zkAppPubKey);
      await localDeploy(
        zkTalentInstance,
        zkAppAccount,
        deployerAccount,
        deployerPubkey
      );
      const talentCounter = zkTalentInstance.talentCounter.get();
      expect(talentCounter).toEqual(Field(0));
    });
    it('should add talent if balance > 1e10', async () => {
      const zkTalentInstance = new Talents(zkAppPubKey);
      await localDeploy(
        zkTalentInstance,
        zkAppAccount,
        deployerAccount,
        deployerPubkey
      );
      const talentCounter = zkTalentInstance.talentCounter.get();
      expect(talentCounter).toEqual(Field(0));
      const txn = await Mina.transaction(deployerPubkey, () => {
        zkTalentInstance.addTalent();
      });
      await txn.prove();
      await (await txn.sign([deployerAccount]).send()).wait();
      const newTalentCounter = zkTalentInstance.talentCounter.get();
      expect(newTalentCounter).toEqual(Field(1));

      // check balance
      console.log(
        'full balance',
        Account(deployerPubkey).balance.get().toString()
      );
    });
    it('should not add talent if balance < 1e10', async () => {
      const zkTalentInstance = new Talents(zkAppPubKey);
      await localDeploy(
        zkTalentInstance,
        zkAppAccount,
        deployerAccount,
        deployerPubkey
      );
      const talentCounter = zkTalentInstance.talentCounter.get();
      expect(talentCounter).toEqual(Field(0));
      const testerAccount = PrivateKey.random();

      expect(async () => {
        await Mina.transaction(testerAccount.toPublicKey(), () => {
          zkTalentInstance.addTalent();
        });
      }).rejects;

      const newTalentCounter = zkTalentInstance.talentCounter.get();
      expect(newTalentCounter).toEqual(Field(0));

      // check balance
      console.log(
        'empty balance',
        Account(testerAccount.toPublicKey()).balance.get().toString()
      );
    });
    it('it should apply talent if talent is eligible', async () => {
      const zkTalentInstance = new Talents(zkAppPubKey);
      await localDeploy(
        zkTalentInstance,
        zkAppAccount,
        deployerAccount,
        deployerPubkey
      );

      const pb: PublicKey = deployerPubkey;
      const sk: Signature = Signature.create(
        PrivateKey.fromBase58(testOraclePrivateKey),
        [Field.fromFields(pb.toFields()), Field(50)]
      );

      // apply talent
      const txn2 = await Mina.transaction(deployerPubkey, () => {
        zkTalentInstance.applyToTalent(pb, Field(50), sk);
      });

      await txn2.prove();
      await (await txn2.sign([deployerAccount]).send()).wait();
    });
    it('emits an event after adding talent', async () => {
      const zkTalentInstance = new Talents(zkAppPubKey);
      await localDeploy(
        zkTalentInstance,
        zkAppAccount,
        deployerAccount,
        deployerPubkey
      );

      const txn = await Mina.transaction(deployerPubkey, () => {
        zkTalentInstance.addTalent();
      });
      await txn.prove();
      await (await txn.sign([deployerAccount]).send()).wait();

      const newTalentCounter = zkTalentInstance.talentCounter.get();

      const events = await zkTalentInstance.fetchEvents();
      const verifiedEventValue = events[0].event.data.toFields(null)[0];
      expect(verifiedEventValue).toEqual(newTalentCounter);
    });
    it('emits a correct event after applying talent', async () => {
      const zkTalentInstance = new Talents(zkAppPubKey);
      await localDeploy(
        zkTalentInstance,
        zkAppAccount,
        deployerAccount,
        deployerPubkey
      );

      const pb: PublicKey = deployerPubkey;
      const sk: Signature = Signature.create(
        PrivateKey.fromBase58(testOraclePrivateKey),
        [Field.fromFields(pb.toFields()), Field(50)]
      );

      // apply talent
      const txn2 = await Mina.transaction(deployerPubkey, () => {
        zkTalentInstance.applyToTalent(pb, Field(50), sk);
      });

      await txn2.prove();
      await (await txn2.sign([deployerAccount]).send()).wait();

      const events = await zkTalentInstance.fetchEvents();
      const verifiedEventValue = events[0].event.data;
      expect(verifiedEventValue).toEqual({ pb, eligibilityScore: Field(50) });
    });
    it('throws an error if talent is not eligible', async () => {
      const zkTalentInstance = new Talents(zkAppPubKey);
      await localDeploy(
        zkTalentInstance,
        zkAppAccount,
        deployerAccount,
        deployerPubkey
      );

      const pb: PublicKey = deployerPubkey;
      const sk: Signature = Signature.create(
        PrivateKey.fromBase58(testOraclePrivateKey),
        [Field.fromFields(pb.toFields()), Field(10)]
      );

      // apply talent
      expect(
        async () =>
          await Mina.transaction(deployerPubkey, () => {
            zkTalentInstance.applyToTalent(pb, Field(10), sk);
          })
      ).rejects;
    });
    it('throws an error if talent is eligible but signature is correct', async () => {
      const zkTalentInstance = new Talents(zkAppPubKey);
      await localDeploy(
        zkTalentInstance,
        zkAppAccount,
        deployerAccount,
        deployerPubkey
      );

      const pb: PublicKey = deployerPubkey;
      const sk: Signature = Signature.create(PrivateKey.random(), [
        Field.fromFields(pb.toFields()),
        Field(50),
      ]);

      // apply talent
      expect(
        async () =>
          await Mina.transaction(deployerPubkey, () => {
            zkTalentInstance.applyToTalent(pb, Field(50), sk);
          })
      ).rejects;
    });
  });
});
