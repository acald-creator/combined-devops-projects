import {
  Table,
  Column,
  Model,
  PrimaryKey,
  CreatedAt,
  UpdatedAt,
} from 'sequelize-typescript';

  @Table
class User extends Model<User> {
    @PrimaryKey
    @Column
    public email!: string;

    @Column
    public passwordHash!: string; // for nullable fields

    @Column
    @CreatedAt
    public createdAt: Date = new Date();

    @Column
    @UpdatedAt
    public updatedAt: Date = new Date();

    short() {
      return {
        email: this.email,
      };
    }
  }

export { User as default };
