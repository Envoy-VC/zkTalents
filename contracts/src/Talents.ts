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
} from 'snarkyjs';

const ORACLE_PUBLIC_KEY = 'oracle_public_key';

export class Talents extends SmartContract {
  @state(PublicKey) oraclePublicKey = State<PublicKey>();
  @state(Field) talentCounter = State<Field>();

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
    senderUpdate.account.balance
      .get()
      .assertGreaterThanOrEqual(
        UInt64.from(1e10),
        'Not Eligible to Create Talents'
      );

    // Increment the talent counter
    const counter = this.talentCounter.get();
    this.talentCounter.assertEquals(counter);

    this.talentCounter.set(counter.add(Field(1)));
  }
  /**
   * @param  {PublicKey} pb
   * @param  {Field} isEligible
   * @param  {Signature} signature
   */
  @method applyToTalent(
    pb: PublicKey,
    isEligible: Field,
    signature: Signature
  ) {
    // Get Oracle Public Key
    const oraclePublicKey = this.oraclePublicKey.get();
    this.oraclePublicKey.assertEquals(oraclePublicKey);

    // Verify Signature
    const validSignature = signature.verify(oraclePublicKey, [
      isEligible,
      Field.fromFields(pb.toFields()),
    ]);
    validSignature.assertTrue();

    // Check if the applicant is eligible
    isEligible.assertEquals(Field(1), 'Not Eligible');
  }
}
