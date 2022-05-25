import { Request, Response } from 'express';
import { Restaurant } from '@models/Restaurant';
import { Citi, Crud } from '../global' 

export default class RestaurantController implements Crud {

    async create(request: Request, response: Response){
        const {name, address, typeOfFood} = request.body;

        const isAnyUndefined = Citi.areValuesUndefined(name, address, typeOfFood);
        if(isAnyUndefined) return response.status(400).send();

        const newRestaurant = { name, address, typeOfFood };
        const {httpStatus, message} = await Citi.insertIntoDatabase(Restaurant, newRestaurant);

        return response.status(httpStatus).send({ message });
    }

    async get(request: Request, response: Response){
        const {httpStatus, values} = await Citi.getAll(Restaurant);
        return response.status(httpStatus).send(values);
    }

    async delete(request: Request, response: Response){
        const { id } = request.params;
        const {value: userFound, message} = await Citi.findByID(Restaurant, id);

        if(!userFound) return response.status(400).send({ message });

        const {httpStatus, messageFromDelete } = await Citi.deleteValue(Restaurant, userFound);
        return response.status(httpStatus).send({ messageFromDelete });
    }

    async update(request: Request, response: Response){
        const { id } = request.params;
        const {name, address, typeOfFood } = request.body

        const isAnyUndefined = Citi.areValuesUndefined(name, address, typeOfFood, id);
        if(isAnyUndefined) return response.status(400).send();

        const userWithUpdatedValues = { name, address, typeOfFood };

        const { httpStatus, messageFromUpdate } = await Citi.updateValue(Restaurant, id,userWithUpdatedValues);
        return response.status(httpStatus).send({ messageFromUpdate });
    }

}

