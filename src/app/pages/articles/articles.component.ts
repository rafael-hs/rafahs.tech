import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Article {
  title: string;
  pubDate: string;
  link: string;
  thumbnail: string;
  content: string;
}

@Component({
  selector: 'articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.sass']
})
export class ArticlesComponent implements OnInit {

  articles: Article[] = [];
  isLoading = true;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getInfosMedium();
  }

  getInfosMedium() {
    this.isLoading = true;
    this.http.get<any>("https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@rafael-hs")
      .subscribe({
        next: (data) => {
          if (data && data.items && Array.isArray(data.items)) {
            // Processar cada artigo para garantir que tenha uma thumbnail
            this.articles = data.items.map((article: any) => {
              // Se não tiver thumbnail ou a thumbnail for vazia
              if (!article.thumbnail || article.thumbnail === '') {
                // Tentar extrair a primeira imagem do conteúdo
                const imgRegex = /<img[^>]+src="([^"]+)"/g;
                const matches = [...article.content.matchAll(imgRegex)];
                
                if (matches && matches.length > 0) {
                  article.thumbnail = matches[0][1];
                } else {
                  // Se não encontrar nenhuma imagem no conteúdo, usar uma URL de imagem padrão
                  article.thumbnail = 'https://miro.medium.com/max/1200/1*jfdwtvU6V6g99q3G7gq7dQ.png';
                }
              }
              return article;
            });
          } else {
            console.error('Formato de dados inválido:', data);
            this.articles = [];
          }
          this.isLoading = false;
        },
        error: (err) => {
          console.error('Erro ao buscar artigos:', err);
          this.articles = [];
          this.isLoading = false;
        }
      });
  }

  format_date(date: string) {
    let date_att = new Date(date)
    return date_att.toUTCString()
  }

}
