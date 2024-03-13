import { Router } from 'express';
import { getUser, loginUser, registerUser, registerAddress, checkEmail, checkUsername, changeUsername, changeEmail, changePassword, changeProfilePictureId, changeFullName, changeAddress, changeCity, changeState, changeCountry, changePostalCode} from '../controllers/user.controller';
import { authenticateToken } from '..';

const router = Router();
router.get('/', authenticateToken, getUser);
router.get('/login', loginUser);
router.post('/register', registerUser);
router.patch('/registerAddress', authenticateToken, registerAddress);
router.get('/checkEmail', checkEmail);
router.get('/checkUsername', checkUsername);
router.patch('/changeUsername', authenticateToken, changeUsername)
router.patch('/changeEmail', authenticateToken, changeEmail)
router.patch('/changePassword', authenticateToken, changePassword)
router.patch('/changeProfilePicture', authenticateToken, changeProfilePictureId)
router.patch('/changeFullName', authenticateToken, changeFullName)
router.patch('/changeAddress', authenticateToken, changeAddress)
router.patch('/changeCity', authenticateToken, changeCity)
router.patch('/changeState', authenticateToken, changeState)
router.patch('/changeCountry', authenticateToken, changeCountry)
router.patch('/changePostalCode', authenticateToken, changePostalCode)

export default router;