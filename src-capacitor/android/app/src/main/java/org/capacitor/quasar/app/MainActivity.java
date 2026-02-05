package org.capacitor.quasar.app;

import android.os.Build;
import android.os.Bundle;
import android.view.View;
import android.view.Window;
import android.view.WindowManager;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsControllerCompat;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        // registerPlugin(com.getcapacitor.community.database.sqlite.CapacitorSQLite.class);
        super.onCreate(savedInstanceState);
        
        Window window = getWindow();
        
        // Enable edge-to-edge display
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
            window.setDecorFitsSystemWindows(false);
        } else {
            View decorView = window.getDecorView();
            int flags = decorView.getSystemUiVisibility();
            decorView.setSystemUiVisibility(
                flags | 
                View.SYSTEM_UI_FLAG_LAYOUT_STABLE | 
                View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION |
                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN
            );
        }
        
        // Make system bars transparent
        window.setStatusBarColor(0x00000000);
        window.setNavigationBarColor(0x00000000);
        
        // Configure system bar appearance
        WindowCompat.setDecorFitsSystemWindows(window, false);
    }
}
