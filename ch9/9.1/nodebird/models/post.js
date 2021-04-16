const Sequelize = require('sequelize');

module.exports = 
class Post extends Sequelize.Model {
    static init( sequelize ){
        const modelStatic = {
            content: {
                type: Sequelize.STRING(140),
                allowNull: false,
            },
            img: {
                type: Sequelize.STRING(200),
                allowNull: true,
            },
        };
        const modelAttributes = {
            sequelize,
            timestamps: true,
            underscored : false,
            modelName: 'Post',
            tableName: 'Posts',
            paranoid: true, /* createAt, updateAt, deleteAt 컬럼 생성 */
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        };
        return super.init( modelStatic, modelAttributes );
    }

    static associate(db){
        /** 
         * Post 는 User 에 속하여있다.
         * Post 테이블에 User 의 식별자를 포함하고 외래키로 사용한다.
        */
        db.Post.belongsTo( db.User, {
            foreignKey: 'userId',
            targetKey : 'id',
        } );


        /**
         * Post : Hashtag
         * n    : 1 
         */
        db.Post.belongsToMany( db.Hashtag, {
            foreignKey: 'hashtagId',            
            through: 'PostHashtag',
        });
    } 
};