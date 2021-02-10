const DataTypes = require('sequelize');
const { Model } = DataTypes;

// Model 최신 문법
module.exports = class Post extends Model{
    static init(sequelize){
        return super.init({
            content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            // RetweetId
        },{
            modelName: 'Post',
            tableName: 'posts',
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci', //  한글, 이모티콘(mb4) 저장
            sequelize,
        });
    }

    static associate(db){
        db.Post.belongsTo(db.User); // post.addUser, post.getUser
        db.Post.hasMany(db.Comment); // post.addComments, post.getComments
        db.Post.hasMany(db.Image); // post.addImages, post.getImages
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag'}); // 다대다 관계 // post.addHashtags

        // 좋아요
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); // 좋아요 테이블 1:N - like - N:1  // post.addLikers, post.removeLikers

        // retweet
        db.Post.belongsTo(db.Post, { as: 'Retweet' }); // PostId -> RetweetId로 바뀜 // post.addRetweet
    }
};


