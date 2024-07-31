export const angularServiceSnippet = `
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://api.example.com/data';

  constructor(private http: HttpClient) { }

  sendData(data: any): Observable<any> {
    const headers = new HttpHeaders()
      .set('X-APN', 'your-api-key')
      .set('Content-Type', 'application/json');

    return this.http.post(this.apiUrl, data, { headers });
  }
}
`.trim();


export const axiosInstanceSnippet = `
import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://api.example.com',
});

apiClient.interceptors.request.use(config => {
  config.headers['X-APN'] = 'your-api-key';
  return config;
});

export default apiClient;
`.trim();


export const fetchSnippet = `
fetch('https://api.example.com/data', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'X-APN': '<your-api-key>'
  },
  body: JSON.stringify({ key: 'value' })
})
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
`.trim();


export default {angularServiceSnippet, axiosInstanceSnippet, fetchSnippet}