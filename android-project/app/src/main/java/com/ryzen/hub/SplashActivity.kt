package com.ryzen.hub

import android.content.Intent
import android.os.Bundle
import android.os.Handler
import android.os.Looper
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity

class SplashActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.layout_splash)

        val tvLogs = findViewById<TextView>(R.id.tvSplashLogs)
        val messages = arrayOf(
            "Initializing system...",
            "Connecting to secure server...",
            "Bypassing firewalls...",
            "Access granted."
        )

        var current = 0
        val handler = Handler(Looper.getMainLooper())
        
        val runnable = object : Runnable {
            override fun run() {
                if (current < messages.size) {
                    val existing = tvLogs.text.toString()
                    tvLogs.text = "$existing\n> ${messages[current]}"
                    current++
                    handler.postDelayed(this, 1000)
                } else {
                    startActivity(Intent(this@SplashActivity, MainActivity::class.java))
                    finish()
                }
            }
        }
        handler.post(runnable)
    }
}
