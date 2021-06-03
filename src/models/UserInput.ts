import { IsString, IsNumber, MaxLength, IsNotEmpty, IsEmail} from 'class-validator';

class UserInput {    
    @IsString()
    @IsNotEmpty({message: 'Name cannot be empty string'}) 
    @MaxLength(255, {
        message:'Name too long'
    })
    public name: string;

    @IsString()
    @IsNotEmpty({message: 'Email cannot be empty string'}) 
    @IsEmail()
    public email: string;

    @IsString()
    @IsNotEmpty({message: 'Password cannot be empty string'})
    public password: string;
}

export default UserInput;