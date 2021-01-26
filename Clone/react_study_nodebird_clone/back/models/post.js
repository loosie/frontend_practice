module.exports = (sequelize, DataTypes) => {
    const Post = sequelize.define('Post', { 
         // mysql에 id 기본적으로 세팅되어있음.
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci', //  한글, 이모티콘(mb4) 저장
    });
    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag'}); // 다대다 관계

        // 좋아요
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Liked' }); // 좋아요 테이블 1:N - like - N:1

        // retweet
        db.Post.belongsTo(db.Post, { as: 'Retweet' }); // PostId -> RetweetId로 바뀜
    };

    return Post;
}