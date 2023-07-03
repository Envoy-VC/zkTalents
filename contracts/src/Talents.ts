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
  MerkleMapWitness,
  AccountUpdate,
} from 'snarkyjs';

const ORACLE_PUBLIC_KEY = 'oracle_public_key';
let initialRoot = Field(0);

export class Talents extends SmartContract {
  @state(PublicKey) oraclePublicKey = State<PublicKey>();
  @state(Field) talentCounter = State<Field>();
  @state(Field) mapRoot = State<Field>();

  init() {
    super.init();
    this.account.permissions.set({
      ...Permissions.default(),
      editState: Permissions.proofOrSignature(),
    });
    this.oraclePublicKey.set(PublicKey.fromBase58(ORACLE_PUBLIC_KEY));
    this.talentCounter.set(Field(0));
    this.mapRoot.set(initialRoot);
    this.requireSignature();
  }
  /**
   * @param  {Field} Talent
   * @param  {Signature} signature
   * @param  {MerkleMapWitness} keyWitness
   * @param  {Field} keyToChange
   * @param  {Field} valueBefore
   * @param  {Field} valueAfter
   */
  @method addTalent(
    Talent: Field,
    signature: Signature,
    keyWitness: MerkleMapWitness,
    keyToChange: Field,
    valueBefore: Field,
    valueAfter: Field
  ) {
    // Get Oracle Public Key
    const oraclePublicKey = this.oraclePublicKey.get();
    this.oraclePublicKey.assertEquals(oraclePublicKey);

    // Verify Signature
    const validSignature = signature.verify(oraclePublicKey, [
      Talent,
      valueAfter,
    ]);
    validSignature.assertTrue();

    // Check if the applicant is eligible
    let senderUpdate = AccountUpdate.createSigned(this.sender);
    senderUpdate.account.balance
      .get()
      .assertGreaterThanOrEqual(UInt64.from(1e10));

    // Get the Initial Root and and Check valueBefore
    const initialRoot = this.mapRoot.get();
    this.mapRoot.assertEquals(initialRoot);

    valueBefore.assertEquals(Field(0));

    // Increment the talent counter
    const counter = this.talentCounter.get();
    this.talentCounter.assertEquals(counter);

    this.talentCounter.set(counter.add(Field(1)));

    // Now Update the Root before sending MINA to prevent re-entrancy attacks
    const [rootBefore, key] = keyWitness.computeRootAndKey(valueBefore);
    rootBefore.assertEquals(initialRoot);

    key.assertEquals(keyToChange);

    const [rootAfter, _] = keyWitness.computeRootAndKey(valueAfter);
    this.mapRoot.set(rootAfter);
  }
  /**
   * @param  {Field} isEligible
   * @param  {Signature} signature
   * @param  {MerkleMapWitness} keyWitness
   * @param  {Field} keyToChange
   * @param  {Field} valueBefore
   * @param  {Field} valueAfter
   */
  @method applyToTalent(
    isEligible: Field,
    signature: Signature,
    keyWitness: MerkleMapWitness,
    keyToChange: Field,
    valueBefore: Field,
    valueAfter: Field
  ) {
    // Get Oracle Public Key
    const oraclePublicKey = this.oraclePublicKey.get();
    this.oraclePublicKey.assertEquals(oraclePublicKey);

    // Verify Signature
    const validSignature = signature.verify(oraclePublicKey, [
      isEligible,
      valueAfter,
    ]);
    validSignature.assertTrue();

    // Check if the applicant is eligible
    isEligible.assertEquals(Field(1));

    // Get the Initial Root and and Check valueBefore
    const initialRoot = this.mapRoot.get();
    this.mapRoot.assertEquals(initialRoot);

    valueBefore.assertEquals(Field(0));

    // Now Update the Root before sending MINA to prevent reentrancy attacks
    const [rootBefore, key] = keyWitness.computeRootAndKey(valueBefore);
    rootBefore.assertEquals(initialRoot);

    key.assertEquals(keyToChange);

    const [rootAfter, _] = keyWitness.computeRootAndKey(valueAfter);
    this.mapRoot.set(rootAfter);
  }
}
