import {
  Field,
  UInt64,
  SmartContract,
  state,
  State,
  method,
  Permissions,
  PublicKey,
  Signature,
  AccountUpdate,
  PrivateKey,
  Struct,
} from 'snarkyjs';

export const ORACLE_PUBLIC_KEY =
  'B62qp2oQ8LS4qzXAhQXBrurVowJpEwD4coYvejU4FvZGVDeFf1AMRES';
class ApplyTalent extends Struct({
  pb: PublicKey,
  eligible: Field,
}) {}
export class Talents extends SmartContract {
  @state(PublicKey) oraclePublicKey = State<PublicKey>();
  @state(Field) talentCounter = State<Field>();

  events = {
    'add-talent': Field,
    'apply-talent': ApplyTalent,
  };

  init() {
    super.init();
    this.account.permissions.set({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
    });
    this.oraclePublicKey.set(PublicKey.fromBase58(ORACLE_PUBLIC_KEY));
    this.talentCounter.set(Field(0));
    this.requireSignature();
  }

  @method addTalent() {
    // Check if the applicant is eligible
    let senderUpdate = AccountUpdate.createSigned(this.sender);

    senderUpdate.account.balance.assertEquals(
      senderUpdate.account.balance.get()
    );

    senderUpdate.account.balance
      .get()
      .assertGreaterThanOrEqual(
        UInt64.from(1e10),
        'Not Eligible to Create Talents'
      );

    // Increment the talent counter
    const counter = this.talentCounter.get();
    this.talentCounter.assertEquals(counter);

    const newCount = counter.add(Field(1));

    this.talentCounter.set(newCount);
    this.emitEvent('add-talent', newCount);
  }

  /**
   * @param  {PublicKey} pb
   * @param  {Field} isEligible
   * @param  {Signature} signature
   */
  @method applyToTalent(pb: PublicKey, eligible: Field, signature: Signature) {
    // Get Oracle Public Key
    const oraclePublicKey = this.oraclePublicKey.get();
    this.oraclePublicKey.assertEquals(oraclePublicKey);

    const pbToField = Field.fromFields(pb.toFields());
    // Verify Signature
    const validSignature = signature.verify(oraclePublicKey, [
      pbToField,
      eligible,
    ]);
    validSignature.assertTrue();

    // Check if the applicant is eligible
    eligible.assertEquals(Field(1), 'Not Eligible');
    this.emitEvent('apply-talent', { pb, eligible });
  }

  // TODO merkle map that keeps track of applications
}
