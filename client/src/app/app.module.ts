import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BlockUIModule } from 'ng-block-ui';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { MenuComponent } from './menu/menu.component';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { DashComponent } from './dash/dash.component';
import { RoutesModule } from './routes.module';
import { GroupComponent } from './group/group.component';
import { UserComponent } from './user/user.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { ModalComponent } from './modal/modal.component';
import { SubgroupComponent } from './subgroup/subgroup.component';
import { ModalSubgroupComponent } from './modal-subgroup/modal-subgroup.component';
import { CollectionComponent } from './collection/collection.component';
import { ModalCollectionComponent } from './modal-collection/modal-collection.component';
import { ClientComponent } from './client/client.component';
import { ModalClientComponent } from './modal-client/modal-client.component';
import { ProductComponent } from './product/product.component';
import { ModalProductComponent } from './modal-product/modal-product.component';
import { ModalUserComponent } from './modal-user/modal-user.component';
import { EditSubgroupComponent } from './edit-subgroup/edit-subgroup.component';
import { EditGroupComponent } from './edit-group/edit-group.component';
import { EditCollectionComponent } from './edit-collection/edit-collection.component';
import { EditProductComponent } from './edit-product/edit-product.component';
import { EditClientComponent } from './edit-client/edit-client.component';
import { DropdownComponent } from './dropdown/dropdown.component';
import { EditUserComponent } from './edit-user/edit-user.component';
import { DadosComponent } from './dados/dados.component';
import { RequestComponent } from './request/request.component';
import { ModalAddressComponent } from './modal-address/modal-address.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    HeaderComponent,
    MenuComponent,
    DashComponent,
    GroupComponent,
    UserComponent,
    ModalComponent,
    SubgroupComponent,
    ModalSubgroupComponent,
    CollectionComponent,
    ModalCollectionComponent,
    ClientComponent,
    ModalClientComponent,
    ProductComponent,
    ModalProductComponent,
    ModalUserComponent,
    EditSubgroupComponent,
    EditGroupComponent,
    EditCollectionComponent,
    EditProductComponent,
    EditClientComponent,
    DropdownComponent,
    EditUserComponent,
    DadosComponent,
    RequestComponent,
    ModalAddressComponent,
  ],
  imports: [
    RoutesModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BlockUIModule.forRoot(),
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    Ng2SearchPipeModule
  ],
  exports : [
    RouterModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
