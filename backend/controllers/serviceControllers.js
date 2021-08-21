import asyncHandler from "express-async-handler"
import Service from "../models/serviceModels.js"

// @desc    Fetch all services
// @route   GET /api/services/
// @access  Public

export const getAllServices = asyncHandler(async (req, res) => {
    const services = await Service.find({})
    res.send(services)
})


// @desc    Fetch institutions by bane
// @route   GET /api/schools/:name
// @access  Public

export const getServicesByName = asyncHandler(async (req, res) => {
    const name = req.params.name
    const service = await Service.find({ name: name })
    res.send(service[0])
})

// @desc    Fetch services by Id
// @route   GET /api/services/:id/
// @access  Public

export const getServicesById = asyncHandler(async (req, res) => {
    const service = await Service.findById(req.params.id)
    res.json(service)
})


// @desc    Create a service
// @route   POST /api/service
// @access  Private/Admin

export const createService = asyncHandler(async (req, res) => {
    const service = new Service({
        name: 'new service',
        price: 0.0,
    })
    const createdService = await service.save()
    res.status(201).json(createdService)
})

// @desc    Update a service
// @route   PUT /api/services/:id
// @access  Private/Admin
export const updateService = asyncHandler(async (req, res) => {
    const { name, cost } = req.body
    const service = await Service.findById(req.params.id)

    if (service) {
        service.name = name
        service.cost = cost

        const updatedService = await service.save()
        res.json(updatedService)
    } else {
        res.status(404)
        throw new Error('Service not found')
    }
})


