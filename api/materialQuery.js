var hyperledger = require('../hyperledger/invoke')

materialQuery = async (req, res) =>{   
        // console.log("Number(`${i}000`)",typeof(Number(`${i}000`)));
        // console.log("==========API==============", req.body,req.body.fnc)
        // var stringfy = await arrystring( Number(`${i}0000`), Number(`${i +1}0000`) - 1);
        args = {"po":"QT041111111111111162","posts":"create","itemno":"111101","itemname":"Cement","desc":"poatlad cement 40 kg","quan":"8","uprice":"100","state":"Ottawa","addr":"c-30","delvry":"10-06-2020","buyerid":"B0001","suppid":"S0001","cts":"456789","uts":"456787678","amt":"800"}
        // let args2 = {"hid":`QT04111111111${i+1}`,"peid":"A1111111106","htyp":"T","cli":`BLOCKCUBE${i+1}`,"ctgr":"8","cts":"456789","uts":"456787678","tmid": "22344"};
        // console.log("stringfy", stringfy.length);
        obj = {
            chainId : "mychannel",
            chaincodeId : "track",
            fnc : "materialQuery",
            args : [JSON.stringify(args)]                                       //[JSON.stringify({"hid":"QT0411111111123","peid":"A1111111106","htyp":"T","cli":"BLOCKCUBE23","ctgr":"8","cts":"456789","uts":"456787678","tmid": "22344"})]
        }
        // console.log('============== obj ============', obj)
        hyperledger.invoke(obj, (cb)=>{
            console.log("AAAAAAAAAA", cb);   
        })
}

materialQuery()
