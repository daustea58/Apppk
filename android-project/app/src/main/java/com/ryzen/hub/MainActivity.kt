package com.ryzen.hub

import android.annotation.SuppressLint
import android.os.Bundle
import android.view.View
import android.webkit.WebChromeClient
import android.webkit.WebSettings
import android.webkit.WebView
import android.webkit.WebViewClient
import android.widget.TextView
import androidx.appcompat.app.AppCompatActivity
import com.ryzen.hub.databinding.ActivityMainBinding
import java.text.SimpleDateFormat
import java.util.*

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        setupUI()
        setupWebView()
        startClock()
    }

    private fun setupUI() {
        binding.btnWa.setOnClickListener { loadUrl("https://web.whatsapp.com") }
        binding.btnIg.setOnClickListener { loadUrl("https://www.instagram.com") }
        binding.btnFb.setOnClickListener { loadUrl("https://www.facebook.com") }
        binding.btnTh.setOnClickListener { loadUrl("https://www.threads.net") }
        
        binding.btnBack.setOnClickListener { 
            if (binding.webView.canGoBack()) binding.webView.goBack() 
            else binding.webViewContainer.visibility = View.GONE
        }
        
        binding.btnRefresh.setOnClickListener { binding.webView.reload() }
    }

    @SuppressLint("SetJavaScriptEnabled")
    private fun setupWebView() {
        val settings = binding.webView.settings
        settings.javaScriptEnabled = true
        settings.domStorageEnabled = true
        settings.databaseEnabled = true
        settings.setSupportMultipleWindows(true)
        settings.cacheMode = WebSettings.LOAD_DEFAULT
        settings.userAgentString = "Mozilla/5.0 (Linux; Android 10; K) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Mobile Safari/537.36"

        binding.webView.webViewClient = object : WebViewClient() {
            override fun onPageStarted(view: WebView?, url: String?, favicon: android.graphics.Bitmap?) {
                binding.loadingOverlay.visibility = View.VISIBLE
                binding.tvLoadingLogs.text = "Establishing connection...\nBypassing firewall...\nInjecting session..."
            }

            override fun onPageFinished(view: WebView?, url: String?) {
                binding.loadingOverlay.visibility = View.GONE
            }
        }

        binding.webView.webChromeClient = object : WebChromeClient() {
            override fun onProgressChanged(view: WebView?, newProgress: Int) {
                binding.progressBar.progress = newProgress
            }
        }
    }

    private fun loadUrl(url: String) {
        binding.webViewContainer.visibility = View.VISIBLE
        binding.webView.loadUrl(url)
    }

    private fun startClock() {
        val timer = Timer()
        timer.scheduleAtFixedRate(object : TimerTask() {
            override fun run() {
                runOnUiThread {
                    val sdf = SimpleDateFormat("HH:mm:ss", Locale.getDefault())
                    binding.tvClock.text = sdf.format(Date())
                }
            }
        }, 0, 1000)
    }

    override fun onBackPressed() {
        if (binding.webViewContainer.visibility == View.VISIBLE) {
            if (binding.webView.canGoBack()) binding.webView.goBack()
            else binding.webViewContainer.visibility = View.GONE
        } else {
            super.onBackPressed()
        }
    }
}
