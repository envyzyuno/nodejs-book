const Sequelize = require('sequelize');

/**
 * 해당 CLASS 를 EXPORTS
 * JPA 의 @Entity 같은 개념
 */
module.exports = class User extends Sequelize.Model {
    
    /** 초기화  */
    static init( sequelize ){
        /** 테이블 컬럼의 설정 */
        const modelStatics  = 
            {
                name: {
                    type: Sequelize.STRING(20),
                    allowNull: false,
                    unique: true,
                },
                age: {
                    type: Sequelize.INTEGER.UNSIGNED,
                    allowNull: false,
                },
                married: {
                    type: Sequelize.BOOLEAN,
                    allowNull: false,
                },
                comment: {
                    type: Sequelize.TEXT,
                    allowNull: true,
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false,
                    defaultValue: Sequelize.NOW,
                },
            };
        /** 테이블 자체의 설정 */    
        const modelAttributes = 
            {
                sequelize: sequelize,
                timestamps: false, /** jpa 의 adduict 기능 */
                underscored: false, 
                modelName: 'User',
                tableName: 'users',
                paranoid: false, /** delete_yn 과 비슷한 기능 */
                charset: 'utf8',
                collate: 'utf8_general_ci',
            };
        return super.init( modelStatics, modelAttributes );    
    }

    /** 릴레이션 관계를 설정 */
    static associate( db ){
        /**
         *  1   :  n
         * User : Commnet
         * id  --- commneter
         */
        db.User.hasMany( 
            db.Comment,
            { foreignKey: 'commenter', 
              sourceKey: 'id',
              // as: 'Answers'
            }  
        );

    }

}