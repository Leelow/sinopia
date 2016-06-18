const mongoose = require( 'mongoose' )

var SinopiaPackageSchema = new mongoose.Schema( {
    
    name: {type: String, required: true},
    versions: {type: [String], required: true},
    download: {type: Number, default: 0}

}, {

    toObject: {
        transform: function ( doc, ret ) {
            ret.id = ret._id
            delete ret._id
            delete ret.__v
        }
    }

} )

/** Force validation when update **/
SinopiaPackageSchema.pre( 'findOneAndUpdate', function ( next ) {
    this.options.new = true
    this.options.runValidators = true
    next()
} )

module.exports = mongoose.model( 'sinopia_package', SinopiaPackageSchema )