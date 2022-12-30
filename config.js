var Config = {
    current_environment:'development',
    environments:{
        development:{
            ssl:{}
        },
        production:{
            ssl:{
                key:'',
                cert:'',
                ca:'',
            }
        }
    }
};
module.exports = Config;