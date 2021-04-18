const Sequelize = require('sequelize');


module.exports = 
class Domain extends Sequelize.Model{

    static init( sequelize ){
        return super.init( 
            {
                host:{
                    type: Sequelize.STRING(80),
                    allowNull: false,
                },
                type:{
                    type: Sequelize.ENUM('free', 'premium'),
                    allowNull: false,
                },
                clientSecret:{
                    type: Sequelize.UUID,
                    allowNull: false,
                },
            }, 
            {
                sequelize,
                timestamps: true,
                paranoid: true, 
                modelName: 'Domain',
                tableName: 'domains',
            } 
        );
    }

    static associate( db ){
        /**
         * Domain 이 User 에 속해있다.
         * Domain 테이블에 User 식별자 컬럼이 추가되어있다.
         * 
         * Domain : User
         * n      : 1
         */
        db.Domain.belongsTo( 
            db.User,
            { foreignKey: 'userId', targetKey: 'id' } 

        );
    }

}