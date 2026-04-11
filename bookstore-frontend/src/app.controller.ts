import { Controller, Get, Render } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  @Render('index')
  root() {
    return { message: 'Welcome to Bookstore', layout: 'layouts/main' };
  }

  @Get('login')
  @Render('auth/login')
  login() {
    return { layout: 'layouts/main' };
  }

  @Get('register')
  @Render('auth/register')
  register() {
    return { layout: 'layouts/main' };
  }

  @Get('forgot-password')
  @Render('auth/forgot-password')
  forgotPassword() {
    return { layout: 'layouts/main' };
  }

  @Get('reset-password/:token')
  @Render('auth/reset-password')
  resetPassword() {
    return { layout: 'layouts/main' };
  }

  @Get('cart')
  @Render('cart/index')
  cart() {
    return { layout: 'layouts/main' };
  }

  @Get('orders')
  @Render('orders/index')
  orders() {
    return { layout: 'layouts/main' };
  }

  @Get('admin')
  @Render('admin/dashboard')
  admin() {
    return { layout: 'layouts/main' };
  }
}
