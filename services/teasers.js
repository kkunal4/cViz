'use strict';

var Q               = require('q');
var constants       = require('../scripts/constants');
var model           = require(constants.paths.models +  '/teaser')
//var userModel           = require(constants.paths.models +  '/user')

// Service method definition -- Begin
var service = {};

service.getAll = getAll;
service.create = create;

service.getOneById = getOneById;
service.updateById = updateById;
service.deleteById = deleteById;

module.exports = service;

// Method implementations
function getAll(){
    var deferred = Q.defer();

	model.find(function(err, list){
		if(err) {
            console.log(err);
            deferred.reject(err);
        }
		else
			deferred.resolve(list);
	});

	return deferred.promise;
} // getAll method ends

//get one teaser by ID
function getOneById(id){
    var deferred = Q.defer();

    model
        .findOne({ _id: id })
        .populate('createdBy')
        .exec(function (err, item) {
            if(err) {
                console.log(err);
                deferred.reject(err);
            }
            else
                console.log(item);
                deferred.resolve(item);
        });

    return deferred.promise;
} // gentOneById method ends


//create teaser model
function create(data) {
    var deferred = Q.defer();

    //data.noteBy = "56c71b49bf009e7424e61099";
    console.log("Saving keynote........");
    console.log(data);
    model.create(data, function (err, doc) {
        if (err) {
            console.log("err- " + err);
            deferred.reject(err);
        }
        else
        {
            deferred.resolve();
        }
    });

    return deferred.promise;
}


//update teaser by ID
function updateById(id, data) {
    var deferred = Q.defer();

    model.findByIdAndUpdate(id, data, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else
            deferred.resolve(doc);
    });

    return deferred.promise;
}


//delete teaser by ID
function deleteById(id) {
    var deferred = Q.defer();

    model.findByIdAndRemove(id, function (err, doc) {
        if (err) {
            deferred.reject(err);
        }
        else{
            deferred.resolve(doc);
        }
    });

    return deferred.promise;
}