class Enemigos {
    constructor(vida, velocidad, isAlive) {
        this.vida = vida;
        this.velocidad = velocidad;
        this.isAlive = isAlive;
    }

    restaurarVida(vida) {
        this.vida = vida;
    }

    aumentarVelocidad(velocidad) {
        this.velocidad += velocidad;
    }

    morir() {
        this.isAlive = false;
        this.vida = 0;
    }

    vivir() {
        this.isAlive = true;
    }

    recibirDaño(daño) {
        this.vida -= daño;
    }
}