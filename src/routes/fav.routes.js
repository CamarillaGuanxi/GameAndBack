import { Router } from 'express';
import { AddFavs, getFavs } from '../controllers/fav.controller';
import { RmFavs } from '../controllers/fav.controller';
import { authenticateToken } from '..';
const router = Router();
    router.get('/favoritos', authenticateToken, getFavs)
    router.delete('/Rmfavoritos/:pid',authenticateToken, RmFavs )
    router.post('/Addfavoritos',authenticateToken, AddFavs)

export default router;