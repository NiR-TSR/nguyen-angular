import { Component, OnInit } from '@angular/core';
import {Subject} from 'rxjs';
import { Observable, of } from 'rxjs';

import {
  debounceTime, distinctUntilChanged, switchMap
} from 'rxjs/operators';

import { MovieService } from '../movie.service';
import { Movie } from '../models/movie';


@Component({
  selector: 'app-movie-search',
  templateUrl: './movie-search.component.html',
  styleUrls: ['./movie-search.component.css']
})

export class MovieSearchComponent implements OnInit {

  movies$: Observable<Movie[]>;
  private searchedSubject = new Subject<string>();

  constructor(private movieService: MovieService) { }
  search(searchedString: string): void {    
    console.log(`searchedString = ${searchedString}`);
    this.searchedSubject.next(searchedString);
  }

  ngOnInit() {
    this.movies$ = this.searchedSubject.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((searchedString: string) => this.movieService.searchMovies(searchedString))
    );
  }
}
