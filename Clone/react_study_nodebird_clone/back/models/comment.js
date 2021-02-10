const DataTypes = require('sequelize');
const { Model } = DataTypes;


// Model 최신 문법
module.exports = class Comment extends Model{
    static init(sequelize){
        return super.init({
            // mysql에 id 기본적으로 세팅되어있음.
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
    
            // UserId : 1  -> belongsTo쪽에 Id가 생김
            // PostId : 3
            
        },{
            modelName: 'Comment',
            tableName: 'comments',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci', //  한글, 이모티콘(mb4) 저장
            sequelize,
        });
    }

    static associate(db){
        db.Comment.belongsTo(db.User);
        db.Comment.belongsTo(db.Post);
    }
};
