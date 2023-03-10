const Course = require('../models/Course');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

class CourseController {

    // [GET] /courses/:slug
    show(req, res, next) {
        const slug = req.params?.slug;
        Course.findOne({ slug })
            .then(course => {
                res.render('courses/show.hbs', { course: mongooseToObject(course) });
            })
            .catch(next);
    }

    // [GET] /courses/create
    create(req, res, next) {
        res.render('courses/create');
    }

    // [GET] /courses/:id/edit
    edit(req, res, next) {
        const id = req.params.id;
        Course.findById(id)
            .then(course => {
                res.render('courses/edit.hbs', { course: mongooseToObject(course) });
            })
            .catch(next);
    }

    // [POST] /courses/store
    store(req, res, next) {
        const formData = req.body;
        formData.image = `https://img.youtube.com/vi/${req.body.videoId}/hqdefault.jpg
        `;
        const course = new Course(formData);
        course.save()
            .then(() => {
                res.redirect('/')
            })
            .catch(err => { console.log(err) });
    }

    // [PUT] /courses/:id
    update(req, res, next) {
        Course.updateOne({ _id: req.params.id }, req.body)
            .then(() => {
                res.redirect('/me/stored/courses');
            })
            .catch(next);
    }

    // [DELETE] /courses/:id
    delete(req, res, next) {
        Course.deleteOne({ _id: req.params.id })
            .then(() => {
                res.redirect('back');
            })
            .catch(next);
    }
}

module.exports = new CourseController;