const Sequelize = require('sequelize');

module.exports = class Comment extends Sequelize.Model {
    static init(sequelize){
        /** 테이블 컬럼의 설정 */
        const modelStatics  = {
            comment: {
                type: Sequelize.STRING(100),
                allowNull: false,
            },
            create_at: {
                type: Sequelize.DATE,
                allowNull: true,
                defaultValue: Sequelize.NOW,
            },
        };
        /** 테이블 자체의 설정 */    
        const modelAttributes = {
            sequelize: sequelize,
            timestamps: false,
            modelName: 'Comment',
            tableName: 'comments',
            paranoid: false,
            charset: 'utf8mb4',
            collate: 'utf8mb4_general_ci',
        };
        return super.init( modelStatics, modelAttributes   );
    }

    static associate(db){

        /**
         * p 239 읽어볼것.
         */
        /**
         *    n       :    1 
         * Comment    :    User
         * commenter ---  id
         */
        db.Comment.belongsTo( 
            db.User, 
            { foreignKey: 'commenter', 
              targetKey: 'id'
            }  
        );


    }

};


