const Sequelize = require('sequelize');

module.exports = 
class Hashtag extends Sequelize.Model {
    static init( sequelize ){
        const modelStatic = {
            title: {
                type: Sequelize.STRING(15),
                allowNull: false,
                unique: true,
            },
        };
        const modelAttributes = {
            sequelize,
            timestamps: true,
            underscored : false,
            modelName: 'Hashtag',
            tableName: 'Hashtags',
            paranoid: false, /* createAt, updateAt, deleteAt 컬럼 생성 */
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        };
        return super.init( modelStatic, modelAttributes );
    }

    static associate(db){

        /**
         * Hashtag  :   Post
         * n        :   1
         */
        db.Hashtag.belongsToMany( db.Post, {
             foreignKey: 'postId',
             through: 'PostHashtag' 
        });
    } 
};