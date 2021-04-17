const Sequelize = require('sequelize');

module.exports = 
class User extends Sequelize.Model {
    static init( sequelize ){
        const modelStatic = {
            email: {
                type: Sequelize.STRING(40),
                allowNull: true,
                unique: true,
            },
            nick: {
                type: Sequelize.STRING(15),
                allowNull: false,
            },
            password: {
                type: Sequelize.STRING(100),
                allowNull: true,
            },
            provider: {
                type: Sequelize.STRING(10),
                allowNull: false,
                defalutValue: 'local',
            },
            snsId: {
                type: Sequelize.STRING(30),
                allowNull: true,
            },
        };
        const modelAttributes = {
            sequelize,
            timestamps: true,
            underscored : false,
            modelName: 'User',
            tableName: 'Users',
            paranoid: true, /* createAt, updateAt, deleteAt 컬럼 생성 */
            charset: 'utf8',
            collate: 'utf8_general_ci',
        };
        return super.init( modelStatic, modelAttributes );
    }

    static associate(db){

        /** User 1 :: Post n */
        db.User.hasMany( db.Post, {
            foreignKey: 'userId',
            sourceKey: 'id',
        });

        const Followers = db.User;
        const Followings = db.User;

        /**
         * n        : 1
         * Followers : Followings
         */
         Followers.belongsToMany( Followings, {
            foreignKey: 'followingId',
            as: 'Followers',
            through: 'Follow', /** 테이블명 + Sequelize 모델명 */
        });

        /**
         * n          : 1 
         * Followings : Followers
         */
        Followings.belongsToMany( Followers, {
            foreignKey: 'followerId',
            as: 'Followings',
            through: 'Follow', /** 테이블명 + Sequelize 모델명 */
        });

    } 
};