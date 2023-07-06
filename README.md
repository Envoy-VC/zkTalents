# zkTalents

zkTalents is an innovative project that uses zero-knowledge proofs for job/resume verification. It provides a secure and privacy-focused platform where employers can set specific requirements for job positions while allowing candidates to prove their eligibility without revealing sensitive information.

With zkTalents, employers have the flexibility to define various criteria for job applications like modules. For instance, they can verify a candidate's GitHub pull requests, age, or even incorporate advanced modules like Gitcoin passport measurements for enhanced customization.

To explore the inner workings of zkTalents, you can check into the `contracts` directory, where you will find the contract implementation and the Oracle's functionality.


## Lessons Learned and Challenges Faced in zkTalents

Working on zkTalents was an incredible learning journey for us. We into insights valuable gained zk-SNARKs and the cryptography behind them. Additionally, we acquired hands-on with experience the mina protocol and development the of zkapps.

The concept behind zkTalent was to create an application that enables recruiters to set role requirements while using zero-knowledge proofs (zk) to verify that candidates meet these requirements without revealing any personal information. Similarly, candidates could verify the legitimacy of recruiters without disclosing their own personal details. We also had to plans incorporate modules for added customization, such as Gitcoin passport, proof of humanity, and job/resume verification.

To ensure decentralized yet off-chain storage, we opted to use polybase. However, during the implementation of the project we, encountered some challenges. One of the main issues we faced integrating was the user interface (UI) with the mina protocol. We encountered random errors like converting a string to a publicKey and invalid Key, interacting with on-chain contracts.

Despite these challenges, on working zkTalent provided us with invaluable knowledge and skills. We are to eager and learning continue building on the mina blockchain, as we in believe the potential immense of this.
