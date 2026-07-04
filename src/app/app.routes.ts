import { Routes } from '@angular/router';
import { UserProfile } from './pages/user_profile/user_profile';
import { GamePage } from './pages/game_page/game_page';
import { MoviePage } from './pages/movie_page/movie_page';
import { AlbumPage } from './pages/album_page/album_page';
import { SearchResultsPage } from './pages/search_results_page/search_results_page';

export const routes: Routes = [
    {path: 'user/:id', component: UserProfile},
    {path: 'game/:id', component: GamePage},
    {path: 'movie/:id', component: MoviePage},
    {path: 'music/album/:id', component: AlbumPage},
    {path: 'results/:num/:searchText', component: SearchResultsPage}
];
