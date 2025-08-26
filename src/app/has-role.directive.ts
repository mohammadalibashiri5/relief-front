import {Directive, Input, TemplateRef, ViewContainerRef} from '@angular/core';
import {AuthService} from './services/auth.service';

@Directive({
  selector: '[appHasRole]'
})
export class HasRoleDirective {
  private hasView = false;

  @Input() set appHasRole(role: string) {
    const hasRole = this.authService.hasRole(role);

    if (hasRole && !this.hasView) {
      this.viewContainer.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (!hasRole && this.hasView) {
      this.viewContainer.clear();
      this.hasView = false;
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthService
  ) {}

}
