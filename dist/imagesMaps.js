"use strict";
 var imagesMaps=function(container){ 
container.strToBuf=function(data){let s=2,l=data.length/s,buf=new Uint8Array(l);for(var i=0;i<l;i++){buf[i]=(parseInt(data.substr(i*s,s),16));}return buf;}
container.cache={}; 
container.template3=function(){ let x=this.cache.template3;if(!x) x=this.cache.template3=window.pako.ungzip(this.strToBuf('1f8b0800000000000003cd596b6fe3b815fd2b84062d36c050e6532f8f034c776776b6cd6e8b4eb6683f158a4ddbeac89257521c7b16f3df7b49c9b224cb8e1f49d10f71a44b9a3cf77d48bfcb5733f4144d8af9c8e29eb0d05c45b37931b2a8cf2cb452591ea509bcd9d442d16464c17469a1f5224ef2601d47c99791352f8a6530183c3d3dd94fdc4eb3d980fabe3f30a3d5d4be498c103280e5acdb771335cdcdeafa818100beaac2ecc72c9c442a29cc505bc41815302f2fd2254aa7d35c0162522104190c037afd84c7699c6623eb8dcb9d07422a61ba0cc751b101bdacc1edbb417bed13b6a7be2047b6a73e773adb7b138f1fd8beb50a6dade29dbecaf94a38921f53c291acbb3d7941033afca801a57fe2de87ade7d017826f223998676a0a8bf4e8d1af9f4e130a3b506a4b0d65032fcc25367521cbd64c67986f0b0681b2618d9159b5c2af495440de3ce62afb0c68d55f935f73b51bbecfc2249fa6d9626415fa310e0bf51d668eb485cf1166dc2c77a3d5bb5e1b46092db561b6f44a5528a9b470418952072dba06be40e70316a4dffc1a93068ca96f4b5e61f6a9cdfc1236a6ccf6b6c6afe4c7b1bf0830461c52c585b4995be16284db2e912532ee7830b20d8bedc8357625100fc433a65d84d917951960f761145b08c0ffd3a41e3cfccb3ca4995e6864858f450a6fd002a671fa34b256511e3dc40ab276868add36f9388c21f2c08237a5c233caa86ba16914c7232b4913553ee3ec3156234bad54924e263a0fb3f40b08c66952a87581cbf7ad1c572dc9f66a8936e4385c8eac2c7d4c260063191673041bfe8cb9ed11099f5035ee6c2904aa6caf675006e61b34670354cfad66739b38ac33dd6d4da736afd796b623bb8bfbedc50d142420f93c03c566ac399dd21e2cd57483a53b9fef83a9a61b30dde946d5c10cfe4a4fb73cfe435afc7c99c71b007c07919021301aa2140b9b108af5c7fb52466839e56b1316e7fd3150c6487f043c1b19625918657b14bdcfa23099c5eaa7e4f395fa8283a876794c6d9763ba62312e9f9afa71e2bd827eecb07e9fa187dd5da9198130926c857d9b88a62edcebc9ddba5fdaaebc2e9d8f28f5db6398a96bd5c2028b9537f756d89b63af1d85fe2b78a9ab505e6c6255911078a2140ac4ad9da5e9e2a32e5b6fcde33f0077a126bfeb9d8337e134042e3c6c1a3aa0df76dfa9a6094750424af92f69510e4da27c19879b40fbea9badf56c7e85ec2d3bac0d1054fa0f9761941438cd262a0bf4282a55c92b4d873b0a552e588a838a5057af7812e6f330cb2a28c376cd0e4cc96e0aff934649f00010e2ad740116c9e208fe05622bdbc16e5a3da00ea80a5aabec6f2918120e28b5be63eaca3d4b6affdd850f2afe1d43c38686b554780a6ec5f9528da369340ef51ac11fc3659a0fdf43ed88dfa25fa0b98571291a9ac9d37011c59bc08c97923cfaaa02ca96eba156099727a7004a7a1bae2d872682c2643c07232ea2c9245695288e66493086e056d9b777031332104cfa18a4dbace10f5acffbc5127a75e5ec2a33aba0d7730a18fe3b8445634a94684cddf4a5c793f7318bbf7bb34ffd6eeaa86f2ed4889b91d513387de45b6728b0bc39132b263e89afade6c6a0d65286a8071589c698d9be40d013a90b5d061aa14da4c0e5bb1ec2e6dd8c20f36e86901198b1f2bb66ac2a035b33d103763a85ae6c0f11cd2200d8e4219a823a413fb24ca0d7f25dd88f2c514beb6cda426ac81bc7a5e7bc528ea3a6737abc32e844d2f769966884e338ccf3b2787e2c75d15e9210dfd00085f804ddc376993bc7fad3b81258295a1b641bf3d922c8bb20d51bc1544a18f082ad0d09f943e3f2c1bc157d6496728660f79b1dbe5625b80086abdbf7d9301cd1865197eb33112c36e5f34576709d17b2437821086d852688961566d57940b8d43fb000905f4c1d79639d85f63e8ad5bf3f2445b6b90032f191e7f721ae6a406f11d4dfa898f58e4161cee6bcc1bf85c37dccb087594ff29cea0fd6084c4db6ced5cf078b4aded6afe21b1760605c9fe52ec1c00f63301634bd0e1a876ea4ab109aaa8e5a0c95ad8892590e2c42f7dfe1ae6157b4a32c875b0b391add5e2d5fa9719166584da7f0d02ceaa0e2744a88333db32fbe912a647cafeedb62bfea3f3c16c5ffb6e8dbaed3bd6cac7b2d85431a01eabba2ec1325a6466bdea12f65835c5f1f4084662a57d9ca6c778547d6fa4ac53151e53b55bb859d9823f54d6cd3d0c7bc43489f6b9e7103fd7ff642f7ba111c00864f4a03e9276d21d2b51f541a33a8ff83158f796d6b692e7d51275ccd78cdc25e99ed5878b593f7d82764f28ea36a4b6992ba8f167661dd356f3f9c8e765dfdb0b0a9af7b4d94706dbc7dec870b3271c8cd7ea4ec1b973ba2bbe90b6cf31efd097d8f7e401fd047f423fa847e427f467f4177679961eb6ddac8168febabbe3300ea7bce53ec000bf3bd5deb338c61b07c7b4973ce46fb05f196d65628313436d5f1b783e432fa5a18d8610c1e6963705f0b033f8c8152d602c1e56b8110474008d106e1bf1608790484ebb44008fe5a209c6e7236689c470ed0387cf8a45856f79358c42507e5bae5b99c3a8d1367a33b89b7e299e6f45c3b34f72fcfb4c3c356a5d2f6fdceed37443676c4dc69dc2832f35b68f3785deba61cd79c0cf675736d297d2225e76fb9edbabe64557bbd42db539aff616d0186779c3ead4be6a39ba2d7ec6d0e97bbbe7bf402aabc5a3a40b08e32a4c605d5c832cbb4f3a8aef645a68af15c7b4293b95a6ab0b5648600264547fa54717fa143b26dace788cf4116771ee17a512fdbcda8dab1c93e86dac3dbb874ba5ebf8d75c366dd5aa38f8d8ddb3cb65f55ce3ffede39fa9879eec98c4bd67bf46d5f2d6e83adbc72de8fb7c19e4a3d85f212952e520851c3d29e536afbc358be9addfe1782474c06f6220000'),{to:'string'});return(x);};
container.testMap=function(){ let x=this.cache.testMap;if(!x) x=this.cache.testMap=window.pako.ungzip(this.strToBuf('1f8b0800000000000003ed5a596fe33610fe2b848a62374049f3d29938c0ee76afde68d1be16aa2d5beaca9221294eb245ff7b87947c48961d9b715b3f78817544521c7e1cce7c332475532ea6e83e1957f1d07228b5501c25d3b81a5a4215164974ff3a7f185a1451c425458cabdaa828933c1b5a8c300b25e3a105426c0b3dccd2ac0c1ed224fb34b4e2aa9a0783c1fdfd3db917242fa603e6fbfe40b736aff6bdc429a5031067ddde8ca349a9a5ab070e15d0350a8bf745384ea2acd24ded2ae63209ef95553e47f9645246300fda20843a6886927ac2a33ccd8ba1f5c51f6ee8cb515399cfc351523dc2bcac41470a6b49e1874b19b4116e4d42eb23888b6802727a66d33f4b0734c8869614847a167a84472c606a0f7c68d90ef101df236feaa64daf5fb3a4028ddf9551f10b208c7ecc7e2d2385f004806c21306d207162379018ad9f352a97c806d5b2fabf0226cf15183f5760deb90273ce15183b5f95b17345e69e2b307abe2a3b4b9d41385a2de62902d23cac623d4e118d2ae6b9d0070adf63e6f8c46336e2b620aee3c5305d2ed9c28599523bc675f173af042c76c8702591fe424842b913635dfa5c07ffc7346a423e3c31467deb9614793e7b97df65e3bf26499a067745fab2474957d7aa75990704ec6fddef87bcaabb8e93729e868f419667d1df4441dd10f905a43f9dee75b1b84ba3205a44593e1e5fcfc324ab705e8ca32250ad6816169f20298304a4c83f45d7ebe4a41658576f3ee37158c66151343896b56a32a3701e140ad166e59f7992057fc0f8e9b2769654519126f02790cbba35e6a6422796018769c28ca3e2a7bc4c2ac81c57731d31d7ee6aeb66a0550ea993cafb6e6fa6b5cda9fe60468df6865692295cd6c66257b379fa3368da427936cbc1ae7248549b05248d7c344494d8d7eb57eeaaed3718b46f82d2e9df6a158656b30c56a36ef0144ae9b2d4eab4b15043ab67a53a79a416a3ec54fb11e6ca736226882717faf783ae6f9bb89af52f55981465dd5530e24807c3fbd4b6536c1357d89850a852462ed4afe7eab26a924897eb36a46b541baacb751b54d875d3e7a7f57690ea476932822d42394bd2e8e50b5d8ac62fae9ea3f5660bc360d61ee73695b4fec7576fac0d16786a55bbf283a1a51ce154abd85da137799145858546695802e9adbcbe5e33202547b89853221c111397bb0bf51363f5ab971b548a1ef466e651ffb6787a6df86a38785508a0abe5ae8e51fae57a5b5797aa22ccca495ecc009d7a4cc32a7a8925bd5a21dca4ace30140f811c703d81cbf4d1806085c15888e45e0d0c60841462fb93b3d467a3c36dbb58fc746d1de05aaa2874a6dab8352055350601141645d68e37c54fea3e682eb710246b87d8d0163096c1fe1490ef65dcea351324946a15278f0e2559184e957e8074011a62f2c353d97788ea3a7c80427dc6f36c56a642e544b2d27f90ca3794d69128293430f2daeebad44edd62b009cd582d4134892bb466bcbdf96f50abd466fd0d7e82d7a87dea30fe823fa067d8bbebb1968c9105114d4ff44559831624b56c3e744ac35e5096a9f46532049ec18ec2945b1954a6a991d21628d580fe4f20394cff7cbb4b764ba4fcb14fb65ba5d99624bb5db32e57e99fe964cff6999f67e998c7585ca0316c9e9daedf11cacf2f2e359184124dac9c45b1958c3974d36770a7a04eac6cc84bc1be03b10ee6074ecf673fa60daca3dd9aea869c3b0360cbb7c7bcaa9102a530dab101790b58430b63a36dd91baaa04c0a3082616f3e6b052d54b47f898630fdb586fafb6338795dee90912a7759ed4ec015484d1c3747601434b6f03fedfb4aad19947173d2a93985df4b5d2d711bef7eafbdfbf5bf0df5f1ba46e425f0db4b39396dafb9caf3e397b7646b584cdcd605313d80e7b8a3480061c4f7668406e3a3d284c8dfe9bb765c217ebddf276a52c8fc6dbba52a7d5176d99fafa3b03a7616ca7d71861786b80c13f2d840f266ab0f7616811815039648b08186d3101dd1fff2f16becd07b5ca16b22ffe5f14f60c4a786310feed9de1df0c823483d03d1f3928949f2c01796370a8a3503b4609c801f987b0ddee36a4c53af5f71cbd3115db1717dae61c59734edf9ee3a2ae67242106eeae9310237fa7a7f2f7f726b08529ec1da71406b98e096c6376a5076d947cba454c721731a9a3a18baf75a88973cde53b8e432e0a7b06391944754d4e46615d9ecccb4d601b6723fc2027777b4e3f62463b26db63ac66db4a833cd63f6d1efbce0082b69d1362786f8261f7719e99319a60d8bba7d8b02c265de65b07c05a7e25b1010caa8acac04c18618ebb07deee1bc60d79b3b02a92879784f99c3b487d61dd3c32e9116123e913aaf8607973c83cc7c3f4349794d74a200ed3649a05a552c2f57d0c548c35de00e05e030383a4242b9371547fe9b4fe98ea4a5f3b4a4e3c7ba9ed8dcb2c4e89b7bae36cdf6ab6eec7f4a758520be0fa232e6fe38a8c53cf8355d50bd4bd07eb6c72686793e36dd20c776a9ac1ed8302d91713079b36c5a5a14dbd7d480c4c8a8bbd36b5757af46c23e39e4f98ab8d8c3b1d2b3b918d1d6e5257ff8a01f9ccba55abd1673fc793d8471312734f4ba4df9860d81dd49eda72ecb919d5ffcbc5f4f61f7dc5fcfc41320000'),{to:'string'});return(x);};
container.WorldMap=function(){ let x=this.cache.WorldMap;if(!x) x=this.cache.WorldMap=window.pako.ungzip(this.strToBuf('1f8b0800000000000003ed5adb6e1b3912fd1542c102e307d264f19e8df3b02fbb2f8b7dd89d0f5064b5ad1d473264c5b97cfd9ec36ec952ac8b9dd1cc00834580582d76932cd6a953a7aaf5eee1f1467d9e5daf6eaf46ce066facf523753b9ddddcaeae46d967e37218a9c7d9f4f3df165fae46565925399a9a9c72351a1b30fae5e3ddfce1ed97bbd9fc97abd1ed6a75fff6f2f2f3e7cfe6b3378be5cda5abb55eb6d1e1d67d3789b5f6129b19bd7f773ded1edebf5b8eaf67e3bbbff3cf74be52edf9b7b7cb6977357a83cfd3f1723d56a2e8a8f348cdaeaf46bb8f9588ed4db0efec4c2e119fbfc24e978c8fb8e8b606baed81253e1753bd8cd4cd30d37f96e3f943b7587ebc1a7d1caf96b32f3f99ec6b2c8a276282645b94c7792451558cb372f1f4eccff3d90a467f7a982eff7d3f9e4cff35fff9613aba7c8d8dce87b2cf40e7a3ed2df4858b0f1696646cf5bd85eb816e7b80161ae7ca31035db32d9b104b54211917b2d24e62303e84dfc9bc9aa5370fd08cb1aecdb3a606d79bb71ee8b607605e8079f9b4792615497e6d5e00b0d3994db392b4ec332e385f7ae3b44bc188acf1698309c45eb733d46d0fd17fd91b09a7f67ae400b43331e3b894b17068520084adb1c2c726b96ca3d2d127534594b762acf88bd7599e25c57d76475b6b6fb7f3a6b8d45b1dc508a9a6dbfabedbfa1e16838d6c3aea52e3adf7b28e499b610c182c54e57988678ec9c63b7b0dcc21ae1d2bd6243b38d6bb6862dd38763dd46d0fd1b192e0e47a1abb0e6c6d69adc6b9c4f31a97aa3fc0a929c63c58e7899401b420bf2803e5ac07baed013a3019b1e1b80713d9a68fcc98403878a40615abb1eecc26e65af61a98b3ace31289ae372f1783701dac6bdf765bdf2e992a8d4bc7f345e5c4cab85832ecc25ff14199e80ab2080eac1695a2117f66fea123f75b99d29fcbca03122094c14ec1ee29571a5c4334a5e6ded4f540b73d006b233267f12fc9212187800f488da59c3bf3237fecb5ab06dfdb154191b994de3029d1f8b5619b916e7b8414e3b2c9ee6514e362a56d3a50ecfd060cbadf6db5e9ce9624e0865a06bf15c8913c64fecd40b735b06cd9a392808f49b7827fc87ba1469267c92ec2545f90b294c79945af34b24d726786e9c194412fe75f91cb0f248416de0189dd6f529000ea439add8c74db235b19e82c740a6de78784116a451a1ec82642ac593b6c6533d26d8f602b9599e478ca184c77b69444db912b24d697386ed780b6f73dc1f7feddc36a71af165df730455104bdcd6b3d59dc2db0c137aeab35b7e9766e73dfdd963e7cc8aee36d97bb6bbc601bed684f6cc3d6705dae4f6ec35e6737f9c16db454f2c76fa3e9ca13db00927df970721bae942992fd0f9f863ee9962ad7d275273712c601dcf0631be949e5c43ec49589b527f7f1c117e96f7bfd3e5a11770a1ef6f4590cf7fcc006fa52ebd416a621b9f86c178635d62e38c6d54a7d7ee3b3fb7c1abbe704802cf26ce5185cf94d41b9cea8a7d0d089bc000d55d2f8001a2efb2ecd8d5a3d1172fb78375e4d7faac8c6a81b754582761723ded7cdeeeef4f2d3ddf46a347d9cce17d7d75c6cb9f865aad7fd27544071f325179c8cef914d169fe6b8f77e3c9baff462793dc5ce3899fa385efe325d3e0c0f6091fbf1ea56e148fea921018243398f82239730d12150b72a672144a3669fc786ac5dc52e716f35a9060d35e1b2160f3597b42f701fc63224936b0ff8541552a48b49bb684df15e493511d3a0b60c296072e8da5a343417c444c8287530160d0a69e4d96a8b72eca5882a48b45915df4a6b88eb221e3357ac2e9aab63df98296a365a308292dfa7a42b547885098e1af3db68fbdcd7aa26265b42af487d46218f7880ca2b2a209dfa8284c863431e5cdefdf4e679c5daaafbff1fe1ee11e2e8048a0afb358e483e7c844dc1b533bcbcf92e2ed6fd161c688ca9972bd8858564492c706b15c608f4c9aebea2338aafd0ef9b0eadfdcb5377b6bf7abece5a1015c179b3148f284e7484c3a4edef6ceb186f6d0d6be55982531aca2df9d2ba2ec369344491a89e5621be24c17cf8a27a23790278985cb33642f5160b3c67a2f53ac1b5c4976b9ea5ae4b1849b08b9d29725d3648c34029f087db3dfcac00d8e0705b90ac5232529c022425aa0ccce5d80bfca082616153db3a1e48f20d63b96840877500ae72de0f136d520cd6f738911450dae27fd893191f287c8f018505e930ae1790a3b3d5d7c6bc8709f26a345fcca7afa3cbe1ebcd02f6050cfa7d1ab66b343fb18220940062e57196aea4892e3860b811f54246ee15b8ad88ce3d0f0441e496d6c1f4550ff7b4079c1a6e690f2042fb5bfa27aa6af7f40f44354cda3fa1864987278685fb0786758707fcb06eff443ae047eb321caf8d7715d3c097b554d485d1023a603aac4ef649c7fcc936eec531f79d29bfc117d3bbbbd93da297b55481add1afbb190c1fbeb860598c42ddb293c8aa1861998e613186176d1d2cfa72a88101f2cbecd9ab0a06b83dacbef2db6e81591ec7cbd978355bcc3564ca6a36bf79783b871fc7777fd5a0b1076c66aafb59dff6917298a57db417cfac131958091945906c1cbc1e6cb905706c7924c662b8d5edeadb86d37ea30dd62c7b3698e29e736e1dbcb66d368fdbae53f6b7c5880f8ff82cee1f6de4db4e1cafb918b975785cd85807e325096c7920d7e3144080fc5f47f6c60af3b6b591193ee3aa82fac9d11e8782282609078d7cedc4f30ac53b7378ad7c8986db1aeb2610466c2d078124614cea21dc7943d06460a802a94909e06c836a53209edb840a2b29ae8880ac95adb6189812b011d5ef6a7f467719d573cfd42ed50cc911b09253053ac66fe2fa4d9e48fc70fdbbd3b2fb515ade9bc4432af695495c9beca3c4419408455ed324de5d9c07e92d6df8d8ea81544d496ec2741ea0c50039f8d623e522fdc6a6f18061cd973f4c09b857f8fa992f6f8ae00f8a8906119f89842c0425322e6455a1cc94509adab1a2a5b0c5c72b50a31ed643794a1de70326f7001e3314cce585875ecdec59237422e70ab9025bd103ce966dc2f585895959423c437132374002034988165286b86fa34d7cf5ced8f6f4e374b25a2cf5b4ebf0618d9ec39a1c30dfa7138e810f2a3a3fc7de874fabd5ceb7ff5dcce640c06c355d6ebe6f577733fcb91a85cdb7d7e387dbf17239fefadd7afc7ea7b8dc474dcf70db7fb365cc2120f7dcf432203f559d6cd99614950e89e4704e0027d229b00654d63201bcbc03e151b392ca506040ca004b9e2f37bc38a2466ce39a440983342c7cc79ca055513195427541c8e38648fd02459a145ba0910a92aa2532a3e32bcb00c8ecbd2354f9f684b1a0f976db53d6264131055852816265468fc51e7304568b8724c26521a1436d812c591e557cd1525a5b30f0f18aed11e1d2e09e0165801dc57b769ca6b42880aec3d62a191eaa1cf4cf528c6113603de20a14ce204c1cb63953be59aa305404b17f8f80191de20702c517cd6485da14d19333d78aa07fd88140b2a8d2221f179e78ee97f4865523f645635a488336a49147ab09b95148392dae9d0f5938b396a81084745a4d3a61089510ae126dc1bc85c2cf634270057c54db7f3cb948bd783032f9eaece22910f7de21654f16cfe540a85ceeaf181dd5885b5758a148e5bb789c1e2b520b20b956389e09e39c91aecad4d4f2003cd554d7b806042ba814853ef4f404c84f99ae47298e8c1de9c6145b1de0812b3801951a0404cb439489e44a00c8357839947d921a9c80d58209aa75447de85b151110e1bb17706a5b74b88057a04d40bece212862d08cf19d8b2dee8db5865fc3bd7cc7fd7aee2d7f0aeeedcfeeb5222267b64990bf4137fc1b10ce9016c297c0a815c16b6ce7306e062d7a4edeafe0b7922807c02267a47d07d10a39843a12727402cae01b2668188a8ed453894508805221424151ed2d22824651eb164d6d43b6738e00c5648af283556b5ff4524ca4360a7e0a2a838035b508a7471492a222320a4800ec4e7943c2b6144209e709fe0c4c2d91d48694d1e8d5c53643606c4170b10066c7a472679c9442266736d74c64f3ce79e1d4a03ed2adef43b2729fc85b9436c132eb0153c28e4ae65b60f6d5903112e553ae01660afb7cacbdf331dae42bdde7a4e8450e6178bfb341fa29035ba5ee762c139c5570c602d59864827c24b4235761651212db853860245ef644f95e31b9764c4cbfc80218e66f87986990dc50ba3017e7c653a818687e2af063683a33e2ca3b221b674259bb39408cc7a291219970810f9c623b3df6fb129251663f81b7c51e591e192d62e7889782d9125b5a21342a055f82d6aa2afcc184502b0460a34682a3d5539e68acd4b3b0a6b4a2a8b0210a36f445618f3105fe1cd17bb7bf3812c898e1370c9036405369920673c778b4878545cfd0f3f89126d58ecb6d6cedc66429fc50b832321c9311e5920b1eb2caa9e8f87b135c0217380f4f111f5ac7b210b58401922a950578c4c379a8565cd56c4627444f60b79082c3339ac131a9385d7d4b572cb919bf4013339df0c779ccd460bd0456c01d6c40b25ca54c4a2a2367b764e5587538ea14ec5425847e666c2560a2506aca017f550b6f436f665b1bcb5222b146429452773177b21a97a31dc8f646fe8f731fd99f3ff57dff3f220d97c37d2c0000'),{to:'string'});return(x);};

 return(container);}