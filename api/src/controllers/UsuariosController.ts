import { Usuario } from "../models/Usuario";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { ILike } from "typeorm";
import * as nodemailer from "nodemailer";
import * as puppeteer from "puppeteer";

export class UsuariosController {
  async sendEmail(req: Request, res: Response): Promise<Response> {
    let body = req.body;

    let emailConfig = {
      host: "smtp.office365.com",
      port: 587,
      secure: false,
      tls: {
        rejectUnauthorized: false,
        ciphers: "SSLv3",
      },
      auth: {
        user: "rellirenan@outlook.com",
        pass: "123456crieti",
      },
    };

    let mailOptions = {
      from: "rellirenan@outlook.com",
      to: body.email,
      subject: "Email enviado pelo node",
      html: `Estou enviando um e-mail de exemplo para ${body.nome}`,
    };

    let transporter = nodemailer.createTransport(emailConfig);

    transporter.sendMail(mailOptions, async function (error, info) {
      if (error) {
        console.log("Erro ao enviar email:" + error);
        return res.status(401).send("Erro ao enviar email" + error);
      } else {
        console.log("Email enviado: " + info.response);
        return res.status(200).send("Email enviado: " + info.response);
      }
    });

    return res.status(401);
  }
  async list(req: Request, res: Response): Promise<Response> {
    let nome = req.query.nome;

    let users: Usuario[] = await Usuario.findBy({
      nome: nome ? ILike(`${nome}`) : undefined,
    });
    return res.status(200).json(users);
  }

  async find(req: Request, res: Response): Promise<Response> {
    let usuario = res.locals.usuario;
    return res.status(200).json(usuario);
  }

  async create(req: Request, res: Response): Promise<Response> {
    let body = req.body;

    let senha = await bcrypt.hash(body.senha, 10);

    let usuario: Usuario = await Usuario.create({
      nome: body.nome,
      email: body.email,
      senha: senha,
    }).save();

    let { senha: s, ...usuarioSemSenha } = usuario;

    return res.status(200).json(usuarioSemSenha);
  }

  async update(req: Request, res: Response): Promise<Response> {
    let body = req.body;
    let usuario: Usuario = res.locals.usuario;

    let senha = await bcrypt.hash(body.senha, 10);

    (usuario.nome = body.nome),
      (usuario.email = body.email),
      (usuario.senha = senha);
    await usuario.save();

    let { senha: s, ...usuarioSemSenha } = usuario;

    return res.status(200).json(usuarioSemSenha);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    let id = Number(req.params.id);
    let usuario: Usuario = res.locals.usuario;
    await usuario.remove();

    return res.status(200).json();
  }

  async listCsv(req: Request, res: Response): Promise<Response> {
    let nome = req.query.nome;

    let users: Usuario[] = await Usuario.findBy({
      nome: nome ? ILike(`${nome}`) : undefined,
    });

    let header = '"ID";"Nome";"Email"\n';
    let csv = header;

    users.forEach((element) => {
      csv += `"${element.id}";"${element.nome}";"${element.email}"\r`;
    });

    res.append("Content-Type", "text/csv");
    res.attachment("usuarios.csv");
    return res.status(200).send(csv);
  }

  async downloadPdf(req: Request, res: Response) {
    let nome = req.query.nome;
    let html: string = `<style>
    *{
      font-family: "Arial";
    }
    table{
      width:100%;
      text-align: left;
      border-collapse: collapse;
      margin-bottom: 10px;
    }
    table td{
      padding: 10px
    }
    table th{
      padding: 10px
    }
    </style>
    <h1>Lista de usuários</h1>
  <table border="1">`;

    let users: Usuario[] = await Usuario.findBy({
      nome: nome ? ILike(`${nome}`) : undefined,
    });
    html += "<tr><th>Nome</th><th>Email</th></tr>";
    users.forEach((element) => {
      html += `<tr><td>${element.nome}</td> <td>${element.email}</td></tr>\r`;
    });
    html += "</table>";
    let today = new Date(Date.now());
    let data = today.toLocaleString(); // "30/1/2022"
    html += `<div>Gerado por: Renan às ${data}</div>`;

    let pdfBuffer = await UsuariosController.pdf(html);

    res.append("Content-Type", "application/x-pdf");
    res.append("Content-Disposition", 'attachment; filename="output.pdf"');
    res.send(pdfBuffer);
  }

  static async pdf(html: string) {
    const browser = await puppeteer.launch({ headless: "new" });
    const page = await browser.newPage();
    await page.setViewport({ width: 1366, height: 768 });
    await page.setContent(html);

    const pdfBuffer = await page.pdf();
    await page.close();
    await browser.close();

    return pdfBuffer;
  }
}
