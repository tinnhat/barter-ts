import "./style.scss"
type Props = {}

export default function Contact({}: Props) {
  return (
    <section className='contact'>
      <div className='banner'>
        <h1 className='banner-title'>Contact</h1>
      </div>
      <div className='contact-container'>
        <div className='container'>
          <div className='text-container'>
            <p className='contact-title'>Get a free consultation right now</p>
            <a href='tel:222 333 00000' className='btn-contact'>
              222 333 00000
            </a>
            <p className='text'>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Fugiat
              cum, architecto minima unde corrupti amet quasi vero ullam
              repudiandae harum nisi molestias nulla, repellendus sit aperiam?
              Sunt repellat consectetur provident. Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Labore incidunt commodi, expedita
              debitis magnam esse voluptates tenetur ipsam delectus. Velit ab
              assumenda rem dolor, at natus suscipit hic ut libero? Lorem ipsum
              dolor sit, amet consectetur adipisicing elit. Dolore accusamus
              inventore, atque soluta culpa reiciendis fugiat? A,
              exercitationem, architecto voluptas omnis nobis ab voluptates
              doloremque beatae quos laboriosam molestiae quod! Lorem ipsum,
              dolor sit amet consectetur adipisicing elit. Aspernatur placeat
              exercitationem, velit maxime debitis magnam quis sunt modi sequi
              incidunt laudantium ad odio dolores tempore blanditiis! Quae totam
              et fugiat! Lorem ipsum dolor sit amet consectetur, adipisicing
              elit. Velit sunt dolores, ducimus quo facere magni culpa tempora
              sit perferendis laborum debitis ab quam, corporis dicta nam est
              placeat consequatur nesciunt. Lorem ipsum dolor sit amet
              consectetur, adipisicing elit. Obcaecati illum doloremque
              accusantium suscipit reiciendis, quos sapiente labore amet. Nihil
              eius illum ipsum fugit repudiandae tempora minus inventore
              doloribus dolores eos.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
