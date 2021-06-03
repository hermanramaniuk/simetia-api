import { IsString, IsNumber, MaxLength, IsNotEmpty, IsEmail} from 'class-validator';

class LibraryInput {    
    @IsString()
    @IsNotEmpty({message: 'bookName cannot be empty string'})
    public bookName: string;

    @IsString()
    @IsNotEmpty({message: 'bookSummary cannot be empty string'})
    public bookSummary: string;
}

export default LibraryInput;