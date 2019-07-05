import { Injectable } from '@angular/core';
import { fakeMovies } from './fake-movies';
import { Movie } from './models/movie';

import { Observable, of } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})

export class MovieService {
  private moviesURL = 'http://localhost:3000/movies';
  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(this.moviesURL).pipe(
      tap(receivedMovies => console.log(`Megkapva dikk = ${JSON.stringify(receivedMovies)}`)),
      catchError(error => of([]))
    );
  }

  getMovieFromId(id: number): Observable<Movie> {    
    const url = `${this.moviesURL}/${id}`;
    return this.http.get<Movie>(url).pipe(
      tap(selectedMovie => console.log(`Kijelölve dikk = ${JSON.stringify(selectedMovie)}`)),
      catchError(error => of(new Movie()))
    );
  }

  updateMovie(movie: Movie): Observable<any> {
    return this.http.put(`${this.moviesURL}/${movie.id}`, movie, httpOptions).pipe(
      tap(updatedMovie => console.log(`Ápdételve dikk = ${JSON.stringify(updatedMovie)}`)),
      catchError(error => of(new Movie()))
    );
  }

  addMovie(newMovie: Movie): Observable<Movie> {        
    return this.http.post<Movie>(this.moviesURL, newMovie, httpOptions).pipe(
      tap((movie: Movie) => console.log(`Berakva dikk = ${JSON.stringify(movie)}`)),
      catchError(error => of(new Movie()))
    );
  }

  deleteMovie(movieId: number): Observable<Movie> {    
    const url = `${this.moviesURL}/${movieId}`;
    return this.http.delete<Movie>(url, httpOptions).pipe(
      tap(_ => console.log(`Törölve dikk = ${movieId}`)),
      catchError(error => of(null))
    );
  }

  searchMovies(typedString: string): Observable<Movie[]> {
    if (!typedString.trim()) {     
      return of([]);
    }
    return this.http.get<Movie[]>(`${this.moviesURL}?name_like=${typedString}`).pipe(
      tap(foundedMovies => console.log(`founded movies = ${JSON.stringify(foundedMovies)}`)),
      catchError(error => of(null))
    );
  }

  constructor(
    private http: HttpClient
  ) { }
}
