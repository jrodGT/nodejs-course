module.exports = (app, mongoose) => {

    const TVShow = new mongoose.Schema({
        titulo: { type: String },
        anio: { type: Number },
        pais: { type: String }
    });
    mongoose.model('TVShow', TVShowSchema);
}