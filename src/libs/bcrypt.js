import bcrypt from 'bcryptjs';

export const encriptarPass = async(password)=>{
    try {
        const salt = await bcrypt.genSalt(10);
        const passwordEncriptada = bcrypt.hash(password, salt);        
        return passwordEncriptada;
    } catch (error) {
        console.log('error al encriptar contraseña');
    }

}
export const compararPass = async(password, passwordEncriptada)=>{

    try {
        const passwordComparada = await bcrypt.compare(password, passwordEncriptada);

        return passwordComparada;
    } catch (error) {
        console.log('error al comparar las contraseñas');
    }
}
