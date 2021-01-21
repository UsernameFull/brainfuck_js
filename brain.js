const readline = require('readline');

//brainfuck程序语句
let inputStr=''
//内存纸带
let memory=[0,0,0,0,0,0,0,0,0,0]
//内存指示器位置
let memIndicate=0;
//输入字符串指示器位置
let strIndicate=0
//记录方括号对位置,一个二维数组，'[[][]]'=>[[0,1,3],[2,4,5]]
let jumpMap=[[],[]]
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  
function generate_jumpMap(str){
    let bracketlist=[]
    for(i=0;i<str.length;i++){
        if(str[i]=='['){
            bracketlist.push(i)
        }else if(str[i]==']'){
            jumpMap[0].push(bracketlist.pop())
            jumpMap[1].push(i)
        }
    }
}

function execute(e){
    if(e=="+"){
        memory[memIndicate]++
    }
    else if(e=="-"){
        memory[memIndicate]--
    }
    else if(e==">"){
        memIndicate++
    }
    else if(e=="<"){
        memIndicate--
    }
    else if(e=="["){
        if(!memory[memIndicate]){
            strIndicate=jumpMap[1][jumpMap[0].indexOf(strIndicate)]
        }
    }
    else if(e=="]"){
        if(memory[memIndicate]){
            strIndicate=jumpMap[0][jumpMap[1].indexOf(strIndicate)]
        }
    }else if(e=="."){ 
        rl.write(String.fromCharCode(memory[memIndicate]));
    }
    else if(e==","){
        rl.question('input',(ans)=>{
            memory[memIndicate]=int(ans)
        })
    }
}


inputStr = "++++++++++[>+++++++>++++++++++>+++>+<<<<-]>++.>+.+++++++..+++.>++.<<+++++++++++++++.>.+++.------.--------.>+.>."
generate_jumpMap(inputStr)
while(strIndicate<inputStr.length){
    execute(inputStr[strIndicate])
    strIndicate++
}
console.log(memory);
