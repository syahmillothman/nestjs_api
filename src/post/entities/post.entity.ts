import { User } from "src/auth/entities/user.entity";
import { Category } from "src/category/entities/category.entity";
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import slugify from 'slugify';
import { Exclude } from "class-transformer";

@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @Column()
    slug: string;

    @Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    createdOn: Date;

    @Column({type: 'timestamp', default: ()=> 'CURRENT_TIMESTAMP'})
    modifiedOn: Date;

    @Column()
    mainImageUrl: string;

    @Column()
    @Exclude()
    userId: number;
    
    @Column({default: 3})
    @Exclude()
    categoryId: number;

    @ManyToOne(() => User, (user) => user.posts, { eager: true })
    @JoinColumn({
    referencedColumnName: 'id',
    name: 'userId',
    })
    user: User;

    @ManyToOne(() => Category, (cat) => cat.posts, { eager: true })
    @JoinColumn({
        referencedColumnName: 'id',
        name: 'categoryId',
    })
    category: Category;

    @BeforeInsert()
    slugifyPost(){
        this.slug = slugify(this.title.substring(0, 20), {
            lower: true,
            replacement: '-'
        });
    }
}
