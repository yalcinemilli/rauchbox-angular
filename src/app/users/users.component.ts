import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, map } from 'rxjs';
import { SarchandfilterService } from '../_services/sarchandfilter.service';
import { DeleteItemComponent } from '../delete-item/delete-item.component';
import { ListResponseUserResponse, User, UserControllerService, UserLevel, UserResponse } from '../open-api';
import { UserLevelControllerService } from './../open-api/api/userLevelController.service';
import { PasswordChangeModalComponent } from './password-change-modal/password-change-modal.component';
import { UsersDetailsModalComponent } from './users-details-modal/users-details-modal.component';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit, OnDestroy {

  users: UserResponse[] = [];
  userlevel: UserLevel[] = [];
  total$: Observable<number>;
  
  constructor(private usersController: UserControllerService,
    private userLevelControllerService: UserLevelControllerService,
    private modalService: NgbModal,
    public service: SarchandfilterService) { }

  ngOnInit(): void {
    this.usersController.getAllUser().subscribe(async (data: ListResponseUserResponse) => {
      this.service.setData(data.list, "Users");
      this.service.daten$.subscribe((data: UserResponse[]) => {
        this.users = data;
      });
    });
    this.userLevelControllerService.getAllUser1().subscribe(async (data: UserLevel[]) => {
      this.userlevel = data;
    });

    this.total$ = this.service.total$;
  }

  ngOnDestroy(): void {
      this.service.setData(null, null);
  }

  userlevelname(id: number): string {
    var levelname: string;
    this.userlevel.forEach(element => {
      if (element.id == id) {
        levelname = element.levelname;
      }
    });
    return levelname;
//    return this.userlevel.find(x => x.id == id).levelname;
  }

  get2fa(id: number): string {
    return id == 1 ? "Aktiviert" : "Deaktiviert";
  }

  openModal(userData: UserResponse) {
    const modalRef = this.modalService.open(UsersDetailsModalComponent);
    modalRef.componentInstance.userobj = userData;
    modalRef.componentInstance.userlevel = this.userlevel;
    if (userData) {
      modalRef.componentInstance.user.subscribe(async (data: UserResponse) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.usersController.updateUser(data, data.id).subscribe((data: UserResponse) => {
              resolve(data);
            });
          }, 2000);
        });
      });
    } else {
    modalRef.componentInstance.user.subscribe(async (data: User) => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.usersController.createUser(data).subscribe((data: User) => {
            this.users.push(data);
            this.service.setData(this.users, "Users");
            resolve(data);
          });
        }, 2000);
      });
    });
  }
  
  }

  openModalPasswort(userData: UserResponse) {
    const modalRef = this.modalService.open(PasswordChangeModalComponent);
    modalRef.componentInstance.userobj = userData;
    if (userData) {
      modalRef.componentInstance.user.subscribe(async (data: UserResponse) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.usersController.updatePassword(data, data.id).subscribe((data: UserResponse) => {
              resolve(data);
            });
          }, 2000);
        });
      });
    }
  
  }


  deleteModal(obj: UserResponse) {
    const modalRef = this.modalService.open(DeleteItemComponent);
    modalRef.componentInstance.meintext = 'User';
    modalRef.componentInstance.answer.
      subscribe(async (data: boolean) => {
        if (data) {
          this.users.splice(this.users.indexOf(await
            new Promise((resolve, reject) => {
              setTimeout(() => {
                this.usersController.deleteUser(obj.id).subscribe((data: UserResponse) => {
                  resolve(obj);
                });
              }, 2000);
            })),1);
            this.service.setData(this.users, "Users");
          }
      }
      );
    }
  

sort(column: string): void {
  this.users = this.service.sort(column, this.users);
}

get rangeStart(): number {
  return (this.service.page - 1) * this.service.pageSize + 1;
}

get rangeEnd(): number | Observable<number> {
  const end = this.service.page * this.service.pageSize;
  return this.total$.pipe(
    map(total => end > total ? total : end)
  );
}

getFortlaufendeNummer(index: number): number {
  return (this.service.page - 1) * this.service.pageSize + index + 1;
}


}
