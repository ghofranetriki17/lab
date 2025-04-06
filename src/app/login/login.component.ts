import { Component } from '@angular/core';
import { AuthServiceService } from 'src/services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = "";
  password: string = "";

  constructor(private auth: AuthServiceService, private router: Router) {}

  sub(): void {
    console.log(this.email, this.password);

    if (!this.email || !this.password) {
      console.error("L'email et le mot de passe sont obligatoires !");
      return;
    }

    this.auth.signInWithEmailAndPassword(this.email, this.password)
      .then(() => {
        console.log("Utilisateur connecté avec succès !");
        this.router.navigate(['/member']);  // Redirection après connexion réussie
      })
      .catch(error => {
        console.error("Erreur de connexion :", error);
      });
  }
}
