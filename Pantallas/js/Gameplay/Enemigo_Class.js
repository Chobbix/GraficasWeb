class Enemigos {
    constructor(vida, velocidad, isReady, lado) {
        this.vida = vida;
        this.velocidad = velocidad;
        this.isReady = isReady;
        this.lado = lado;
    }

    restaurarVida(vida) {
        this.vida = vida;
    }

    aumentarVelocidad(velocidad) {
        this.velocidad += velocidad;
    }

    morir() {
        this.vida = 0;
    }

    recibirDaño(daño) {
        this.vida -= daño;
    }
}