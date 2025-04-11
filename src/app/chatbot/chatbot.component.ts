import { Component, OnInit } from '@angular/core';
import { HomeService } from '../services/home.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConnectionService } from '../services/connection.service';

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit {

  isMenuOpen: boolean = false;
  bot_options = [];
  bot_responses = [];
  top_level_bot = [];
  mid_level_bot_hotels = [];
  responses_bot_contact = [];
  responses_bot_hotels = [];
  load_option: boolean = false;
  isFormOpen: boolean = false;
  is_response = false;
  website_language = "";
  welcome_text = 'Hello, how may I help you today?';
  generated_text = "";
  welcome_text_letters = [];

  form: FormGroup;

  constructor(private conn: ConnectionService, private fb: FormBuilder, private data: HomeService) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: [''],
      message: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  ngOnInit() {
    this.website_language = localStorage.getItem("lang");
    if(this.website_language === "ru"){
      this.welcome_text = "Здравствуйте, чем я могу вам помочь сегодня?";
    }
    else if(this.website_language === "bg"){
      this.welcome_text = "Здравейте, как мога да ви помогна днес?";
    }
    else if(this.website_language === "hy"){
      this.welcome_text = "Բարև ձեզ, ինչպե՞ս կարող եմ օգնել ձեզ այսօր";
    }
    else if(this.website_language === "el"){
      this.welcome_text = "ЗΓεια, πώς μπορώ να σας βοηθήσω σήμερα;";
    }

    if (localStorage.getItem("bot") !== "true") {
      setTimeout(() => {
        this.toggleMenu()
      }, 10000);
      localStorage.setItem("bot", "true")
    }
    this.get_bot_options();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
    this.welcome_text_letters = this.welcome_text.split('');
    console.log( this.isMenuOpen)
    if(this.isMenuOpen === true){
      setTimeout(() => {
        for (let i = 0; i < this.welcome_text_letters.length; i++) {
          setTimeout(() => {
            // Slice the array up to the current index and join it to form a string
            this.generated_text = this.welcome_text_letters.slice(0, i + 1).join('');
          }, (i + 1) * 70);
        }
      }, 500);
    }
   else{
    if(this.website_language === "ru"){
      this.welcome_text = "Здравствуйте, чем я могу вам помочь сегодня?";
    }
    else if(this.website_language === "bg"){
      this.welcome_text = "Здравейте, как мога да ви помогна днес?";
    }
    else if(this.website_language === "hy"){
      this.welcome_text = "Բարև ձեզ, ինչպե՞ս կարող եմ օգնել ձեզ այսօր";
    }
    else if(this.website_language === "el"){
      this.welcome_text = "ЗΓεια, πώς μπορώ να σας βοηθήσω σήμερα;";
    }

   }

  }

  change_fields(field: string) {
    this.load_option = true;
    setTimeout(() => {
      this.load_option = false
    }, 1000);
    if (field === 'bot') {
      this.isFormOpen = false;
    }
    else if (field == 'form') {
      this.isFormOpen = true;
    }
  }

  submitForm() {
    let fullMessage = {
      name: this.form.controls['name'].value,
      email: this.form.controls['email'].value,
      phone: this.form.controls['phone'].value,
      text: this.form.controls['message'].value,
    }
    this.conn.sendMessage(fullMessage).subscribe(
      data => {
        alert("Thank you for sending a message")
      },
      error => {
        if (error.status === 429) {
          alert("Too many requests. Please try again later.");
        } else {
          console.log(error);
          alert("Something went wrong. Please try again later.");
        }
      }
    );

    this.form.reset();
  }


  selectOption(desc) {

    this.load_option = true;
    setTimeout(() => {
      this.load_option = false
    }, 1000);
    const optionMap = {
      "hotelhelp": {
        fn: () => this.data.get_bot_options(this.website_language).subscribe(data => {
          console.log(data);
          this.bot_options = data.topLevelOptions[0].midLevelOptions;
          this.is_response = false;
        })
      },
      "howtocontact": {
        fn: () => this.data.get_bot_options(this.website_language).subscribe(data => {
          console.log(data.topLevelOptions[1].midLevelOptions);
          this.bot_options = data.topLevelOptions[1].midLevelOptions[0].responses;
          this.is_response = true;
        })
      },
      "cantfindhotels": {
        fn: () => this.data.get_bot_options(this.website_language).subscribe(data => {
          console.log(data);
          this.bot_options = data.topLevelOptions[0].midLevelOptions[0].responses;
          this.is_response = true
        })
      },
      "cantseebookingbutton": {
        fn: () => this.data.get_bot_options(this.website_language).subscribe(data => {
          console.log(data);
          this.bot_options = data.topLevelOptions[0].midLevelOptions[1].responses;
          this.is_response = true

        })
      },
      "cantsearch": {
        fn: () => this.data.get_bot_options(this.website_language).subscribe(data => {
          console.log(data);
          this.bot_options = data.topLevelOptions[0].midLevelOptions[2].responses;
          this.is_response = true
        })
      },
    };


    const option = optionMap[desc];
    if (option) {
      option.fn();
    } else {
      console.log(`Option ${desc} not found`);
    }

    console.log(this.is_response)

  }


  get menuState() {
    return this.isMenuOpen ? 'bot_menu open' : 'bot_menu';
  }

  get_bot_options() {
    this.load_option = true;
    this.is_response = false;
    setTimeout(() => {
      this.load_option = false
    }, 1000);
    this.data.get_bot_options(this.website_language).subscribe(
      data => {
        console.log(data)
        this.bot_options = data.topLevelOptions;
      }
    )
  }

}
