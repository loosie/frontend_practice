module.exports = (sequelize, DataTypes) => {
    const Image = sequelize.define('Image', { 
         // mysql에 id 기본적으로 세팅되어있음.
        src: {
            type: DataTypes.STRING(200),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci', 
    });
    Image.associate = (db) => {
        db.Image.belongsTo(db.Post);
    };

    return Image;
}