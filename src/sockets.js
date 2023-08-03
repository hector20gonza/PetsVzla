import "./database.js";
import Comentarios from "./models/comentarios.js";
import Publicaciones from "./models/publicaciones.js";
import User from './models/users.js'
const sockets = (io) => {
   
  
    io.on('connection', (socket) => {
     console.log('a user connected',socket.id);
       socket.on('disconnect', () => {
        console.log('a user disconnected');
      });
     // Escucha el evento 'join' del cliente y lo agrega a una sala para la publicación correspondiente
  socket.on('join', (postId) => {
    console.log(`El cliente se ha unido a la publicación ${postId}`);
    socket.join(postId);

   
  });

   // Escucha el evento 'comment' del cliente y emite el comentario a todos los clientes conectados a la misma publicación
 socket.on('comment',async (data) => {
    console.log(`Nuevo comentario recibido para la publicación ${data.postId}: ${data.comment}:  `);
   const userId=`${data.userId}`;
   const postId=`${data.postId}`;
  
    try {
      // Crea un nuevo comentario en la base de datos
      const newComment = new Comentarios({ body: `${data.comment}`, autor: userId, publicacion: postId});
      await newComment.save();
     
      // Agrega el ID del nuevo comentario a la publicación correspondiente
      const updatedPost = await Publicaciones.findByIdAndUpdate(
        postId,
        { $push: { comments: newComment._id } },
        { new: true }
      ).populate('comments');
     
      io.to(postId).emit('comments', [newComment]);
     
      try {
        const usuarios = await Publicaciones.find({ _id: postId }, { autor: 1, _id: 0 }).lean();
        const userId = usuarios[0].autor.toString();
        socket.emit(`notifications:${userId}`, {
          postId: postId,
          comment: newComment
        });
        console.log('El usuario ha recibido una notificacion de un comentario',userId);
        //En este bloque de codigo tengo guardar en la bd la notiifacion 
      } catch (error) {
        console.error(error);
        throw new Error('Ocurrió un error al obtener los usuarios de la publicación.');
      }
  
    } catch (error) {
      console.error(error);
    }
    
    //Obtener el autor que realizo esa publicacion, y emitir una evento a su id para que sea notificado
     
   
     });
 socket.on('get comments', async (postId) => {
      try {
        const publicacion = await Publicaciones.findOne({ _id: postId }).populate({
          path: 'comments',
          select: 'body'
        }).lean();
        console.log(publicacion);
        socket.emit('comments data', publicacion.comments);
      } catch (error) {
        console.error(error);
        socket.emit('comments data error', 'Error al buscar los comentarios');
      }
    });
  
// Escucha el evento "typing" del cliente y transmite un mensaje a otros usuarios en la misma sala de comentarios indicando que el usuario está escribiendo
socket.on('typing', ({ postId, userId }) => {
  socket.to(postId).emit('user typing', userId);
});

// Escucha el evento "stop typing" del cliente y transmite un mensaje a otros usuarios en la misma sala de comentarios indicando que el usuario dejó de escribir
socket.on('stop typing', ({ postId, userId }) => {
  socket.to(postId).emit('user stop typing', userId);
});
 

  });
  };
 export default sockets;




