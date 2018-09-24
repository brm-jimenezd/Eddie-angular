import { task } from './task';

export const LIST: task[] = [
		{
			id: 2,
			proyect: "Hoteles Estelar",
			state: "proceso",
			date:"10/08/2018", 
			title:"Título OT asignada",
			description: "descripcion de la Ot",
			time: "4 Horas",
			links:[ 
				"https://www.w3schools.com/css/default.asp" ,
				"https://www.w3schools.com/css/css_howto.asp" 
			],
			comments:[
				{
					"name_user":"Ingrid Rios",
					"id_user":"12",
					"date":"09/08/2018",
					"comment":"Este es mi comentario"
				},
				{
					"name_user":"Cristian Tangarife",
					"id_user":"12",
					"date":"09/08/2018",
					"comment":"Este es mi comentario"
				}
			],
			responsable:"ident"
		},
		{
			id: 3,
			proyect: "Nuevo proyecto",
			state: "asignado",
			date:"10/08/2018", 
			title:"Segunda OT asignada",
			description: "descripcion de la Ot",
			time: "2 Horas",
			links:[ 
				"https://www.w3schools.com/css/default.asp" ,
				"https://www.w3schools.com/css/css_howto.asp" 
			],
			comments:[
				{
					"name_user":"Ingrid Rios",
					"id_user":"12",
					"date":"09/08/2018",
					"comment":"Este es mi comentario"
				}
			],
			responsable:"ident"
		},
		{
			id: 4,
			proyect: "Nuevo proyecto",
			state: "pendiente",
			date:"10/08/2018", 
			title:"Segunda OT asignada",
			description: "descripcion de la Ot",
			time: "12 Horas",
			links:[ 
				"https://www.w3schools.com/css/default.asp" ,
				"https://www.w3schools.com/css/css_howto.asp" 
			],
			comments:[
				{
					"name_user":"Ingrid Rios",
					"id_user":"12",
					"date":"09/08/2018",
					"comment":"Este es mi comentario"
				},
				{
					"name_user":"Ingrid Rios",
					"id_user":"12",
					"date":"09/08/2018",
					"comment":"Este es mi comentario"
				},
				{
					"name_user":"Ingrid Rios",
					"id_user":"12",
					"date":"09/08/2018",
					"comment":"Este es mi comentario"
				}
			],
			responsable:"ident"
		}
	];