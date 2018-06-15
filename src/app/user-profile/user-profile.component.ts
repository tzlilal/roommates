import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  id;
  user: User; 
  showPhoneNumber = false; 
  isFemale = false; 
  isFavorite = false; 

  constructor(private route: ActivatedRoute, public authService: AuthService) { }

  ngOnInit() {
    // paramMap is the property that gives us all the parameters in this route 
    this.route.paramMap
    .subscribe(params => {
      this.id = params.get('id'); // the id after the /user/:id  
      this.authService.getUserProfile(this.id)
      .subscribe((user: User) => {
          this.user = user; 
      });
    });

    if (this.user)
      if (this.user.userDetail.sex === "נקבה") this.isFemale = true; 
  }

  onPhoneClick() {
    this.showPhoneNumber = !this.showPhoneNumber; 
  }

  starFavorite() {
    this.isFavorite = !this.isFavorite; 
    this.authService.addToFavorites({_id: this.id})
    .subscribe(); 
  }

  get RoommateGender() { 
    if (this.user) {
      if(this.user.roommateDetail.gender === 'נקבה') return "שותפה"; 
      else if(this.user.roommateDetail.gender === 'זכר') return "שותף"; 
      else if(this.user.roommateDetail.gender === 'אין העדפה') return "שותף/שותפה"; 
    }
  }

  get LookingFor() { 
    if(this.user)
      return this.user.userDetail.sex === "נקבה" ? 'מחפשת' : 'מחפש'; 
  }

  get martialStatus() { 
    if(this.user) {
      if(this.user.userDetail.sex === 'נקבה') { 
        if(this.user.userDetail.martialStatus === 'רווק') return 'רווקה'; 
        if(this.user.userDetail.martialStatus === 'מאורס') return 'מאורסת'; 
        if(this.user.userDetail.martialStatus === 'נשוי') return 'נשואה'; 
        else return this.user.userDetail.martialStatus;
      }
      else 
        return this.user.userDetail.martialStatus; 
    }
  }

  get occupation() { 
    if(this.user) {
      if(this.user.userDetail.sex === 'נקבה') { 
        if(this.user.userDetail.occupation === 'עובד במשרה מלאה') return 'עובדת במשרה מלאה'; 
        if(this.user.userDetail.occupation === 'עובד במשרה חלקית') return 'עובדת במשרה חלקית'; 
        if(this.user.userDetail.occupation === 'סטודנט') return 'סטודנטית'; 
        if(this.user.userDetail.occupation === 'חייל') return 'חיילת'; 
      }
      else 
        return this.user.userDetail.occupation; 
    }
  }

  get religion() { 
    if(this.user) {
      if(this.user.userDetail.sex === 'נקבה') { 
        if(this.user.userDetail.religion === 'חילוני') return 'חילונית'; 
        if(this.user.userDetail.religion === 'מסורתי ששומר שבת') return 'מסורתית ששומרת שבת'; 
        if(this.user.userDetail.religion === 'דתי') return 'דתיה'; 
        if(this.user.userDetail.religion === 'אתאיסט') return 'אתאיסטית'; 
      }
      else 
        return this.user.userDetail.religion; 
    }
  }

  get smoking() { 
    if(this.user) {
      if(this.user.userDetail.sex=== 'נקבה') { 
        if(this.user.userDetail.smoking === 'מעשן') return 'מעשנת'; 
        if(this.user.userDetail.smoking === 'לא מעשן') return 'לא מעשנת'; 
      }
      else 
        return this.user.userDetail.smoking; 
    }
  }

  get animals() { 
    let res = '';
    if(this.user) {
      if(this.user.userDetail.animals) {
        if(this.user.userDetail.sex === 'נקבה') { 
          res += "בבעלותה: ";
        }
        else if(this.user.userDetail.sex === 'זכר') {
          res += "בבעלותו: ";
        }
        if(this.user.userDetail.animals["כלב"]) res += ' כלב';
        if(this.user.userDetail.animals["חתול"]) res += ' חתול';
        if(this.user.userDetail.animals["אחר"]) res += ' בע"ח אחר ';
      }
      return res; 
  }
}

  get playInstrument() {
    if(this.user) {
      if(this.user.userDetail.sex=== 'נקבה') { 
        if(this.user.userDetail.playInstrument === 'מנגן בכלי נגינה') return 'מנגנת בכלי נגינה'; 
        if(this.user.userDetail.playInstrument === 'לא מנגן בכלי נגינה') return 'לא מנגנת בכלי נגינה'; 
      }
      else 
        return this.user.userDetail.playInstrument; 
    } 
  }

  get roommateOccupation() {
    if(this.user) {
      if(this.user.roommateDetail.gender=== 'נקבה') { 
        if(this.user.roommateDetail.occupation === 'עובד במשרה מלאה') return 'עובדת במשרה מלאה'; 
        if(this.user.roommateDetail.occupation === 'עובד במשרה חלקית') return 'עובדת במשרה חלקית'; 
        if(this.user.roommateDetail.occupation === 'סטודנט') return 'סטודנטית'; 
        if(this.user.roommateDetail.occupation === 'חייל') return 'חיילת'; 
      }
      else 
        return this.user.roommateDetail.occupation; 
    }
  }

  get roommateReligion() {
    if(this.user) {
      if(this.user.roommateDetail.gender === 'נקבה') { 
        if(this.user.roommateDetail.religion === 'חילוני') return 'חילונית'; 
        if(this.user.roommateDetail.religion === 'מסורתי ששומר שבת') return 'מסורתית ששומרת שבת'; 
        if(this.user.roommateDetail.religion === 'דתי') return 'דתיה'; 
        if(this.user.roommateDetail.religion === 'אתאיסט') return 'אתאיסטית'; 
      }
      else 
        return this.user.roommateDetail.religion; 
    }
  }

  get rommateSmoking() { 
    if(this.user) {
      if(this.user.roommateDetail.gender === 'נקבה') { 
        if(this.user.roommateDetail.smoking === 'מעשן') return 'מעשנת'; 
        if(this.user.roommateDetail.smoking === 'לא מעשן') return 'לא מעשנת'; 
      }
      else 
        return this.user.roommateDetail.smoking; 
    }
  }

  get rommateAnimals() { 
    if(this.user) {
      if(this.user.roommateDetail.gender === 'נקבה') { 
        if(this.user.roommateDetail.animals === 'אוהב בעלי חיים') return 'אוהבת בעלי חיים'; 
        if(this.user.roommateDetail.animals === 'לא אוהב בעלי חיים') return 'לא אוהבת בעלי חיים'; 
      }
      else 
        return this.user.roommateDetail.animals; 
    }
  }

  get roommatePlayInstrument() {
    if(this.user) {
      if(this.user.roommateDetail.gender=== 'נקבה') { 
        if(this.user.roommateDetail.playInstrument === 'מנגן בכלי נגינה') return 'מנגנת בכלי נגינה'; 
        if(this.user.roommateDetail.playInstrument === 'לא מנגן בכלי נגינה') return 'לא מנגנת בכלי נגינה'; 
      }
      else 
        return this.user.roommateDetail.playInstrument; 
    } 
  }




  

}
