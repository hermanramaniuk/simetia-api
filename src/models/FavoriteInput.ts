import { IsNotEmpty, IsNumber } from 'class-validator';

class FavoriteInput {
    @IsNumber()
    @IsNotEmpty({message: 'userId cannot be empty'})
    public userId: number;

    @IsNumber()
    @IsNotEmpty({message: 'bookId cannot be empty'})
    public bookId: number;
}

export default FavoriteInput;