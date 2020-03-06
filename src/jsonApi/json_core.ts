import * as jsonpointer from 'json-pointer';
import { Transform } from 'stream'

namespace jsonapi {
    /**
      * Project a JavaScript object following a projection pattern.
      * @param data The JavaScript object to be projected.
      * @param projection An array of valid json pointer to project data upon.
      * @return The newly created projected object.
      */
    export function project(data: {}, projection: Array<string>) {
        let out = {}
        projection.forEach((key) => {
            if (jsonpointer.has(data, key)) {
                jsonpointer.set(out, key, jsonpointer.get(data, key));
            }
        })
        return out;
    }
    
    /**
      * Flattify a JavaScript object, following the json-pointer key mapping.
      * @param data The JavaScript object to be flattified.
      * @return The newly created flattified object.
      */
    export function flatten(data: {}) {
        return jsonpointer.dict(data);
    }
    
    /**
      * Unflattify a JavaScript object, following the json-pointer key mapping.
      * @param data The JavaScript object to be unflattified.
      * @return The newly created unflattified object.
      */
    export function unflatten(data: { [pointer: string]: any }) {
        let out = {}
        // console.log(data)
        // console.log(Object.keys(data))
        Object.keys(data).forEach((pointer) => {
            // console.log(data)
            // console.log(pointer)
            // console.log(pointer[0])
            // console.log(pointer[9])
            // console.log(pointer.length)
            // console.log(pointer === ' /reference ')
            jsonpointer.set(out, pointer, data[pointer])
        })
        return out
    }
    
    /**
      * Rename the propreties of a Javascript object.
      * @param data The JavaScript object to be rekeyed.
      * @param recipes An array of valid pair json pointer / newPropertyName to rename.
      * @return The modified object object.
      * @remarks This function alter the orginal object, and doesn't create a new one !
      */
    export function rekey(data: {}, recipes: Array<{ pointer: string, newPropertyName: string | number }>) {
        // let out = JSON.parse(JSON.stringify(data));
        let out = data;
        recipes.forEach((recipe) => {
            if (jsonpointer.has(data, recipe.pointer)) {
                // console.log(recipe)
                // console.log(JSON.stringify(data))
                let value = jsonpointer.get(data, recipe.pointer)
                jsonpointer.remove(out, recipe.pointer);
                let newPointer = jsonpointer.parse(recipe.pointer);
                newPointer.pop()
                newPointer.push(String(recipe.newPropertyName))
                jsonpointer.set(out, jsonpointer.compile(newPointer), value);
            }
        })
        return out;
    }

        /**
      * Reshape the shape(structure) of a Javascript object.
      * @param data The JavaScript object to be reshaped.
      * @param recipes An array of valid pair old json pointer / new json pointer to reshape.
      * @return The modified object object.
      * @remarks This function alter the orginal object, and doesn't create a new one !
      */
     export function reshape(data: {}, recipes: Array<{ old_pointer: string, new_pointer: string}>) {
        // let out = JSON.parse(JSON.stringify(data));
        let out = data;
        recipes.forEach((recipe) => {
            if (jsonpointer.has(data, recipe.old_pointer)) {
                // console.log(recipe)
                // console.log(JSON.stringify(data))
                let value = jsonpointer.get(data, recipe.old_pointer)
                jsonpointer.remove(out, recipe.old_pointer);
                jsonpointer.set(out, recipe.new_pointer, value);
            }
        })
        return out;
    }
    
    
    export function transform< OUT>(data: {}, transformFunction: (value: any) => OUT, pointer?: string) {
        if (pointer !== undefined) {
            return transformFunction(jsonpointer.get(data, pointer));
        } else {
            return transformFunction(data)
        }
    }

    
    export function streamProject(projection: Array<string>) {
        return new Transform({
            objectMode: true,
            transform: (object: {}, encoding: string, callback: Function) => {
                let data = project(object, projection);
                callback(null, data);
            }
        })
    }
    
    export const streamFlatten = new Transform({
            objectMode: true,
            transform: (object: {}, encoding: string, callback: Function) => {
                let data = flatten(object);
                callback(null, data);
            }
        })
    
    export const streamUnflatten = new Transform({
            objectMode: true,
            transform: (object: {}, encoding: string, callback: Function) => {
                let data = unflatten(object);
                callback(null, data);
            }
        })
    
    export function streamRekey(recipes: Array<{ pointer: string, newPropertyName: string | number }>) {
        return new Transform({
            objectMode: true,
            transform: (object: {}, encoding: string, callback: Function) => {
                let data = rekey(object, recipes);
                callback(null, data);
            }
        })
    }

    export function streamTransform<OUT>( transformFunction: (value: any) => OUT, pointer?: string) {
        let out_stream = new Transform({
            objectMode: true,
            transform: (object: {}, encoding: string, callback: Function) => {
                let data = transform(object, transformFunction, pointer);
                callback(null, data);
            }
        })
        // out_stream.on('end', () => {
        //     console.log('end transform')
        // })
        return out_stream
    }
}

export default jsonapi